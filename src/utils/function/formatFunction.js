export const formatDate = (time) => {
  if (!time) return '';
  try {
    const date = new Date(time);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // ✅ Chuẩn HTML input[type=date]
  } catch (error) {
    console.error('Lỗi khi formatDateForInput:', error);
    return '';
  }
};
