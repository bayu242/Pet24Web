// Fungsi get icon hewan berdasarkan tipe
function getPetIcon(petType) {
  if (petType === "ct") {
    return "assets/cat.svg";
  } else {
    return "assets/dog.svg";
  }
}

// Fungsi hitung umur (tahun, bulan, dan hari)
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
    let days = today.getDate() - birthDate.getDate();

    // Sesuaikan jika hari negatif
    if (days < 0) {
      months--;
      // Ambil jumlah hari dari bulan sebelumnya
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Sesuaikan jika bulan negatif
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
    if (days > 0) {
      ageText += (ageText ? " " : "") + `${days} hari`;
    }

    return ageText || "0 hari";
  } catch {
    return "-";
  }
} // Fungsi format alamat
function formatAddress(address) {
  if (!address) return "-";
  // Potong jika terlalu panjang
  return address.length > 100 ? address.substring(0, 100) + "..." : address;
}

function capitalizeFirstLetter(string) {
  if (string.length === 0) {
    return string; // Handles empty strings gracefully
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const defaultData = {
  on: "Bayu Seto Aji",
  oc: "085875777353",
  pn: "Boy",
  pbd: "20/04/2018",
  pt: "ct",
  pl: {
    adr: "Kelurahan Sindurjan Kode Pos RT.3/RW.2, Rw. I, Sindurjan, Kec. Purworejo, Kabupaten Purworejo, Jawa Tengah 54113, Indonesia",
    crd: {
      la: -7.7115737,
      lo: 109.9974265,
    },
  },
  n: "suka makan tongkol",
};

// console.log(encodeURIComponent(JSON.stringify(defaultData)));

// Fungsi untuk menginisialisasi data
function initializePetData() {
  // Ambil data dari parameter URL
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get("d");

  let petData = JSON.parse(JSON.parse(dataParam));

  console.log(petData)

  // pet data
  document.getElementById("petNameHead").innerHTML = capitalizeFirstLetter(
    petData.pn,
  );
  document.getElementById("petName").innerHTML = capitalizeFirstLetter(
    petData.pn,
  );
  document.getElementById("petBirthday").innerHTML = petData.pbd;
  document.getElementById("petAge").innerHTML = calculateAge(petData.pbd);
  document.getElementById("petNote").innerHTML = petData.n;

  // owner data
  document.getElementById("ownerName").innerHTML = petData.on;
  document.getElementById("ownerContact").innerHTML = petData.oc;
  document.getElementById("ownerAddress").innerHTML = petData.pl.adr;

  const goToMap = () => {
    console.log(petData.pl.crd.la);
  };

  if (petData.pl.crd.la && petData.pl.crd.lo) {
    document.getElementById("maps").innerHTML += `<a
                href="https://www.google.com/maps?q=${petData.pl.crd.la},${petData.pl.crd.lo}"
              >
                <img src="assets/location.svg" width="50" />
              </a>`;
  }
}

// Jalankan saat DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePetData);
} else {
  initializePetData();
}
