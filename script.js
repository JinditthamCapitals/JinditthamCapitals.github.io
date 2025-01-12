function toggleSipBox() {
  const sipBox = document.getElementById("sipBox");
  const sipChart = document.getElementById("sipChart");

  if (sipBox.style.display === "block") {
    sipBox.style.display = "none";
    sipChart.style.display = "none"; // Hide chart when toggling off
    resetSipBox();
  } else {
    sipBox.style.display = "block";
    // sipChart.style.height = "500px";
    // sipChart.style.width = "400px";
  }
}

function resetSipBox() {
  document.getElementById("monthlyInvestment").value = "";
  document.getElementById("annualRate").value = "";
  document.getElementById("investmentPeriod").value = "";
  document.getElementById("totalAmount").innerText = "";
  document.getElementById("sipResult").innerText = "";
  document.getElementById("profitEarned").innerText = "";
  document.getElementById("sipChart").style.display = "none";
  document.getElementById("chartsip").style.display = "none";
}

// Declare the chart globally so it can be updated instead of recreated every time
let sipChartInstance;
let lumpsumChartInstance;

function calculateSip() {
  const monthlyInvestment = parseFloat(
    document.getElementById("monthlyInvestment").value
  );
  const annualRate = parseFloat(document.getElementById("annualRate").value);
  const investmentPeriod = parseFloat(
    document.getElementById("investmentPeriod").value
  );

  if (
    isNaN(monthlyInvestment) ||
    isNaN(annualRate) ||
    isNaN(investmentPeriod) ||
    monthlyInvestment == 0 ||
    annualRate == 0 ||
    investmentPeriod == 0
  ) {
    document.getElementById("sipResult").innerText =
      "Please enter valid values.";
    document.getElementById("totalAmount").innerText = "";
    document.getElementById("profitEarned").innerText = "";
    document.getElementById("sipChart").style.display = "none";
    document.getElementById("chartsip").style.display = "none";
    return;
  }
  // console.log(investmentPeriod>=30);
  // console.log(investmentPeriod<=1);

  if (investmentPeriod >= 30 || investmentPeriod <= 1) {
    document.getElementById("sipResult").innerText =
      "Please enter investment year between 1 to 30";
    document.getElementById("totalAmount").innerText = "";
    document.getElementById("profitEarned").innerText = "";
    document.getElementById("sipChart").style.display = "none";
    document.getElementById("chartsip").style.display = "none";

    return;
  }
  if (annualRate >= 30 || annualRate <= 5) {
    document.getElementById("sipResult").innerText =
      "Please enter expected returns between 5 to 30";
    document.getElementById("totalAmount").innerText = "";
    document.getElementById("profitEarned").innerText = "";
    document.getElementById("sipChart").style.display = "none";
    document.getElementById("chartsip").style.display = "none";

    return;
  }

  if (monthlyInvestment >= 50000000 || monthlyInvestment <= 100) {
    document.getElementById("sipResult").innerText =
      "Please enter investment amount between 100 to 500000000";
    document.getElementById("totalAmount").innerText = "";
    document.getElementById("profitEarned").innerText = "";
    document.getElementById("sipChart").style.display = "none";
    document.getElementById("chartsip").style.display = "none";

    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = investmentPeriod * 12;

  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  document.getElementById(
    "sipResult"
  ).innerText = `Future Value: ₹ ${futureValue.toFixed(2)}`;
  document.getElementById("totalAmount").innerText = `Total Amount: ₹ ${
    monthlyInvestment * investmentPeriod * 12
  }`;
  document.getElementById("profitEarned").innerText = `Profit Earned: ₹ ${(
    futureValue.toFixed(2) -
    monthlyInvestment * investmentPeriod * 12
  ).toFixed(2)}`;

  const totalInvestment = monthlyInvestment * investmentPeriod * 12;
  const profitEarned = (
    futureValue.toFixed(2) -
    monthlyInvestment * investmentPeriod * 12
  ).toFixed(2);

  // Check if the chart already exists, if so, update it instead of creating a new one
  const ctx = document.getElementById("sipChart");
  if (sipChartInstance) {
    sipChartInstance.data.datasets[0].data = [totalInvestment, profitEarned];
    sipChartInstance.update(); // Update the existing chart
  } else {
    // Create a new chart if it does not exist
    sipChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Invested Amount", "Estimated Return"],
        datasets: [
          {
            data: [totalInvestment, profitEarned],
            backgroundColor: ["#007bff", "#28a745"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  document.getElementById("sipChart").style.display = "block";
  document.getElementById("chartsip").style.display = "block";
}

function toggleLumpsumBox() {
  const lumpsum = document.getElementById("lumpsum-box");
  const lumpsumChart = document.getElementById("lumpsumChart");

  if (lumpsum.style.display === "block") {
    lumpsum.style.display = "none";
    lumpsumChart.style.display = "none";
    resetLumpsumBox();
  } else {
    lumpsum.style.display = "block";
  }
}

function resetLumpsumBox() {
  document.getElementById("Investment-lumpsum").value = "";
  document.getElementById("annualRate-lumpsum").value = "";
  document.getElementById("investmentPeriod-lumpsum").value = "";
  document.getElementById("totalAmount-lumpsum").innerText = "";
  document.getElementById("Result-lumpsum").innerText = "";
  document.getElementById("profitEarned-lumpsum").innerText = "";
  document.getElementById("lumpsumChart").style.display = "none";
  document.getElementById("chartlp").style.display = "none";
}

function calculateLumpsum() {
  const Investment_lumpsum = parseFloat(
    document.getElementById("Investment-lumpsum").value
  );
  const annualRate_lumpsum = parseFloat(
    document.getElementById("annualRate-lumpsum").value
  );
  const investmentPeriod_lumpsum = parseFloat(
    document.getElementById("investmentPeriod-lumpsum").value
  );

  if (
    isNaN(Investment_lumpsum) ||
    isNaN(annualRate_lumpsum) ||
    isNaN(investmentPeriod_lumpsum) ||
    Investment_lumpsum == 0 ||
    annualRate_lumpsum == 0 ||
    investmentPeriod_lumpsum == 0
  ) {
    document.getElementById("profitEarned-lumpsum").innerText =
      "Please enter valid values.";
    document.getElementById("totalAmount-lumpsum").innerText = "";
    document.getElementById("Result-lumpsum").innerText = "";
    document.getElementById("lumpsumChart").style.display = "none";
    document.getElementById("chartlp").style.display = "none";
    return;
  }

  if (investmentPeriod_lumpsum >= 30 || investmentPeriod_lumpsum <= 1) {
    document.getElementById("profitEarned-lumpsum").innerText =
      "Please enter investment year between 1 to 30";
    document.getElementById("totalAmount-lumpsum").innerText = "";
    document.getElementById("Result-lumpsum").innerText = "";
    document.getElementById("lumpsumChart").style.display = "none";
    document.getElementById("chartlp").style.display = "none";

    return;
  }
  if (annualRate_lumpsum >= 30 || annualRate_lumpsum <= 5) {
    document.getElementById("profitEarned-lumpsum").innerText =
      "Please enter expected returns between 5 to 30";
    document.getElementById("totalAmount-lumpsum").innerText = "";
    document.getElementById("Result-lumpsum").innerText = "";
    document.getElementById("lumpsumChart").style.display = "none";
    document.getElementById("chartlp").style.display = "none";
    return;
  }

  if (Investment_lumpsum >= 50000000 || Investment_lumpsum <= 100) {
    document.getElementById("profitEarned-lumpsum").innerText =
      "Please enter investment amount between 100 to 500000000";
    document.getElementById("totalAmount-lumpsum").innerText = "";
    document.getElementById("Result-lumpsum").innerText = "";
    document.getElementById("lumpsumChart").style.display = "none";
    document.getElementById("chartlp").style.display = "none";
    return;
  }

  const futureValue_lumpsum =
    Investment_lumpsum *
    Math.pow(1 + annualRate_lumpsum / 100, investmentPeriod_lumpsum);

  document.getElementById(
    "Result-lumpsum"
  ).innerText = `Future Value: ₹ ${futureValue_lumpsum.toFixed(2)}`;
  document.getElementById(
    "totalAmount-lumpsum"
  ).innerText = `Total Amount: ₹ ${Investment_lumpsum}`;
  document.getElementById(
    "profitEarned-lumpsum"
  ).innerText = `Profit Earned: ₹ ${(
    futureValue_lumpsum.toFixed(2) - Investment_lumpsum
  ).toFixed(2)}`;

  const profitEarned_lumpsum = (
    futureValue_lumpsum.toFixed(2) - Investment_lumpsum
  ).toFixed(2);

  // Check if the chart already exists, if so, update it instead of creating a new one
  const ctx2 = document.getElementById("lumpsumChart");
  if (lumpsumChartInstance) {
    lumpsumChartInstance.data.datasets[0].data = [
      Investment_lumpsum,
      profitEarned_lumpsum,
    ];
    lumpsumChartInstance.update(); // Update the existing chart
  } else {
    // Create a new chart if it does not exist
    lumpsumChartInstance = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Invested Amount", "Estimated Return"],
        datasets: [
          {
            data: [Investment_lumpsum, profitEarned_lumpsum],
            backgroundColor: ["#007bff", "#28a745"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  document.getElementById("lumpsumChart").style.display = "block";
  document.getElementById("chartlp").style.display = "block";
}
