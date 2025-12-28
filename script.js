// Fungsi get icon hewan berdasarkan tipe
function getPetIcon(petType) {
  // Tentukan icon berdasarkan tipe hewan
  // ct = kucing (cat), dg = anjing (dog)
  let iconPath = "assets/dog.svg"; // default
  
  if (petType === "ct") {
    iconPath = "assets/cat.svg";
  } else if (petType === "dg") {
    iconPath = "assets/dog.svg";
  }
  
  return iconPath;
}

// Fungsi format tanggal
function formatDate(dateString) {
  if (!dateString) return "-";
  // Handle format DD/MM/YYYY
  try {
    const [day, month, year] = dateString.split("/");
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateString;
  } catch {
    return dateString;
  }
}

// Fungsi hitung umur (tahun dan bulan)
function calculateAge(birthDateString) {
  if (!birthDateString) return "-";
  
  try {
    // Parse format DD/MM/YYYY
    const [day, month, year] = birthDateString.split("/");
    if (!day || !month || !year) return "-";
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    // Sesuaikan jika hari ulang tahun belum terjadi bulan ini
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }
    
    // Sesuaikan bulan negatif
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (years < 0) return "-";
    
    // Format output
    let ageText = "";
    if (years > 0) {
      ageText += `${years} tahun`;
    }
    if (months > 0) {
      ageText += (ageText ? " " : "") + `${months} bulan`;
    }
    
    return ageText || "0 bulan";
  } catch {
    return "-";
  }
}

// Fungsi format alamat
function formatAddress(address) {
  if (!address) return "-";
  // Potong jika terlalu panjang
  return address.length > 100 ? address.substring(0, 100) + "..." : address;
}

// Data hewan default
const defaultData = {
  n: "Boy",
  pbd: "28/12/2025",
  pt: "ct",
  own: "Bayu",
  pn: "0812-3456-7890",
  pl: {
    address: "Kelurahan Sindurjan Kode Pos RT.3/RW.2, Rw. I, Sindurjan, Kec. Purworejo, Kabupaten Purworejo, Jawa Tengah 54113, Indonesia",
    coords: { lat: -7.7115737, long: 109.9974265 }
  }
};

// Fungsi untuk menginisialisasi data
function initializePetData() {
  // Ambil data dari parameter URL
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get("d");

  // Parse data dari URL atau gunakan default
  let petData = defaultData;
  if (dataParam) {
    try {
      petData = JSON.parse(decodeURIComponent(dataParam));
      // Gabungkan dengan default jika ada field yang hilang
      petData = { ...defaultData, ...petData };
    } catch (error) {
      console.error("Error parsing data:", error);
      petData = defaultData;
    }
  }

  // Log data untuk debugging
  console.log("Data Hewan:", petData);
  console.log("Tipe Hewan (pt):", petData.pt);
  console.log("Icon Path:", getPetIcon(petData.pt));

  // Isi detail hewan
  document.getElementById("petName").textContent = (petData.n || "HENRY").toUpperCase();
  document.getElementById("detailName").textContent = petData.n || "-";
  document.getElementById("detailBirthday").textContent = formatDate(petData.pbd);
  document.getElementById("detailAge").textContent = calculateAge(petData.pbd);

  // Isi kontak pemilik
  document.getElementById("ownerName").textContent = petData.own || "-";
  document.getElementById("ownerPhone").textContent = petData.pn || "-";
  document.getElementById("ownerAddress").textContent = formatAddress(petData.pl?.address);
  document.getElementById("ownerEmail").textContent = petData.email || "-";

  // Set gambar hewan berdasarkan tipe
  const petPhoto = document.getElementById("petPhoto");
  const iconPath = getPetIcon(petData.pt);
  petPhoto.src = iconPath;
  petPhoto.alt = petData.pt === "ct" ? "Ikon Kucing" : "Ikon Anjing";
  
  // Log status image
  petPhoto.onload = () => console.log("✓ Icon berhasil dimuat:", iconPath);
  petPhoto.onerror = () => console.error("✗ Gagal memuat icon:", iconPath);
}

// Jalankan saat DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePetData);
} else {
  initializePetData();
}
