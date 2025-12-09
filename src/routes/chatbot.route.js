const express = require("express");
const router = express.Router();
require("dotenv").config();
const OpenAI = require("openai");

// Mongoose Models
const TranDau = require("../models/TranDau.model");
const Ve = require("../models/Ve.model");
const CauThu = require("../models/cauthu");
const QuaLuuNiem = require("../models/qualuuniem");

const fs = require('fs');
const path = require('path');

function loadTrainingData() {
  const filePath = path.join('src/training.txt');
  try {
    const content = fs.readFileSync('src/training.txt', 'utf-8');
    console.log('Nội dung của training.txt:', content);
    return content;
  } catch (err) {
    console.error('Lỗi khi đọc training.txt:', err);
    return '';
  }
}

const trainingData = loadTrainingData();
// =============================
// 1. OPENROUTER INIT
// =============================
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Model FREE
const MODEL = "tngtech/deepseek-r1t2-chimera:free";

// =============================
// 2. HÀM LẤY TẤT CẢ DỮ LIỆU DB
// =============================
async function getAllDataFromDB() {
  const matches = await TranDau.find().lean();
  const tickets = await Ve.find().lean();
  const players = await CauThu.find().lean();
  const gifts = await QuaLuuNiem.find().lean();

  return { matches, tickets, players, gifts };
}

// =============================
// 3. API CHATBOT CHÍNH
// =============================
router.post("/send-message", async (req, res) => {
  try {
    const { message } = req.body;

    // Lấy dữ liệu DB
    const dbData = await getAllDataFromDB();

    // Chuẩn bị system prompt mới
    const systemPrompt = `
Bạn là chatbot trả lời dựa trên dữ liệu thật của hệ thống.
Trả lời NGẮN GỌN, súc tích.
ưu tiên trả lời theo hướng liệt kê sử dụng số để liệt kê (enter xuống dòng sau mỗi ý) thay cho icon.
đừng dùng dấu '*'

Hãy bỏ các mã đưungf liệt kê ra
chỉ liệt kê những field thực sự cần thiết đối với 1 người hâm mộ bóng đá
đây là dữ liệu bạn hãy đọc nó để trả lời các câu hỏi từ người dùng nhé:
  ${trainingData}
Dưới đây là dữ liệu từ MongoDB:

--- TRẬN ĐẤU ---
${JSON.stringify(dbData.matches, null, 2)}

--- VÉ ---
${JSON.stringify(dbData.tickets, null, 2)}

--- CẦU THỦ ---
${JSON.stringify(dbData.players, null, 2)}

--- QUÀ LƯU NIỆM ---
${JSON.stringify(dbData.gifts, null, 2)}

Quy tắc:
- Chỉ trả lời dựa trên dữ liệu trên.
- Nếu không có thông tin phù hợp, trả lời: "Không tìm thấy dữ liệu liên quan."
- Trả lời ngắn gọn, có thể liệt kê bằng gạch đầu dòng.
    `;

    const reply = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: reply.choices[0].message.content });

  } catch (err) {
    console.error("OpenRouter Error:", err);
    res.status(500).json({ error: "Chatbot error" });
  }
});


module.exports = router;
