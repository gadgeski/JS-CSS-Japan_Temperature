// 気温データとコメント
const temperatureData = {
  北海道: {
    temps: [18, 22, 24, 26, 20],
    comments: [
      "涼しく過ごしやすい",
      "散歩日和",
      "軽装で快適",
      "外出に最適",
      "涼しい一日",
    ],
  },
  東北: {
    temps: [25, 27, 29, 24, 26],
    comments: [
      "適度な暖かさ",
      "外出に最適",
      "少し暑め",
      "過ごしやすい",
      "快適な気温",
    ],
  },
  関東: {
    temps: [32, 34, 30, 33, 31],
    comments: [
      "暑い一日",
      "熱中症注意",
      "適度な暑さ",
      "暑さ対策必須",
      "日陰を選んで",
    ],
  },
  中部: {
    temps: [30, 28, 32, 29, 31],
    comments: [
      "暑い",
      "比較的過ごしやすい",
      "暑さ注意",
      "適度な暑さ",
      "日中は暑い",
    ],
  },
  関西: {
    temps: [33, 35, 31, 34, 32],
    comments: [
      "暑い一日",
      "猛暑注意",
      "暑さ対策を",
      "非常に暑い",
      "日中は暑い",
    ],
  },
  中国: {
    temps: [31, 29, 33, 30, 32],
    comments: ["暑い", "適度な暑さ", "暑さ注意", "暑い一日", "日中は暑い"],
  },
  四国: {
    temps: [32, 30, 34, 31, 33],
    comments: ["暑い一日", "暑さ対策を", "非常に暑い", "暑い", "暑さ注意"],
  },
  九州: {
    temps: [34, 36, 32, 35, 33],
    comments: ["暑い一日", "猛暑注意", "暑さ対策を", "非常に暑い", "暑さ注意"],
  },
  沖縄: {
    temps: [36, 38, 34, 37, 35],
    comments: ["猛暑", "危険な暑さ", "非常に暑い", "猛暑注意", "非常に暑い"],
  },
};

// 現在の気温データ(ダミーデータ)
let currentTemperatures = {
  北海道: 27,
  東北: 31,
  関東: 33,
  中部: 33,
  関西: 36,
  中国: 34,
  四国: 30,
  九州: 35,
  沖縄: 32,
};

// 気温に応じたクラスを返す関数
function getTemperatureClass(temp) {
  if (temp <= 20) return "cool";
  if (temp <= 28) return "warm";
  if (temp <= 35) return "hot";
  return "very-hot";
}

// 気温に応じた状態説明
function getStatusText(temp) {
  if (temp <= 20) return "涼しい";
  if (temp <= 28) return "暖かい";
  if (temp <= 35) return "暑い";
  return "猛暑";
}

// 体感温度の説明
function getFeelsLike(temp) {
  if (temp <= 20) return "涼しく感じます";
  if (temp <= 28) return "快適に感じます";
  if (temp <= 35) return "暑く感じます";
  return "非常に暑く感じます";
}

// 気温に応じた推奨事項
function getRecommendation(temp) {
  if (temp <= 20) return "長袖がおすすめです";
  if (temp <= 28) return "半袖で快適に過ごせます";
  if (temp <= 35) return "水分補給をこまめに行いましょう";
  return "外出時は十分な熱中症対策を";
}

// テーブルを生成
function generateTable() {
  const tbody = document.getElementById("temperatureTableBody");
  tbody.innerHTML = "";

  for (const [region, temp] of Object.entries(currentTemperatures)) {
    const row = document.createElement("tr");
    row.className = "region-row";
    row.dataset.region = region;

    const tempClass = getTemperatureClass(temp);

    row.innerHTML = `
                    <td class="region-name">${region}</td>
                    <td>
                        <div class="temperature-display ${tempClass}">${temp}℃</div>
                    </td>
                    <td>
                        <div class="status-indicator ${tempClass}">${getStatusText(
      temp
    )}</div>
                    </td>
                    <td>${getFeelsLike(temp)}</td>
                `;

    row.addEventListener("click", () => showRegionDetails(region, temp));
    tbody.appendChild(row);
  }

  updateSummaryStats();
}

// 統計情報を更新
function updateSummaryStats() {
  const temps = Object.values(currentTemperatures);
  const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const hotRegions = temps.filter((temp) => temp > 35).length;

  document.getElementById("avgTemp").textContent = avgTemp + "℃";
  document.getElementById("maxTemp").textContent = maxTemp + "℃";
  document.getElementById("minTemp").textContent = minTemp + "℃";
  document.getElementById("hotRegions").textContent = hotRegions + "地域";
}

// 地方詳細表示
function showRegionDetails(regionName, temp) {
  // 前回選択した行のハイライトを削除
  document.querySelectorAll(".region-row").forEach((row) => {
    row.classList.remove("selected-row");
  });

  // 現在選択した行をハイライト
  document
    .querySelector(`[data-region="${regionName}"]`)
    .classList.add("selected-row");

  const infoPanel = document.getElementById("infoPanel");
  const data = temperatureData[regionName];
  const randomComment =
    data.comments[Math.floor(Math.random() * data.comments.length)];
  const tempClass = getTemperatureClass(temp);

  let emoji = "";
  switch (tempClass) {
    case "cool":
      emoji = "🔵";
      break;
    case "warm":
      emoji = "🟡";
      break;
    case "hot":
      emoji = "🔴";
      break;
    case "very-hot":
      emoji = "🟣";
      break;
  }

  infoPanel.innerHTML = `
                <h3>${emoji} ${regionName}地方</h3>
                <div style="background: white; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <p><strong>🌡️ 現在の最高気温:</strong> <span class="temperature-display ${tempClass}" style="font-size: 1.1em;">${temp}℃</span></p>
                    <p><strong>☀️ 今日の天気:</strong> ${randomComment}</p>
                    <p><strong>👕 服装の推奨:</strong> ${getRecommendation(
                      temp
                    )}</p>
                    <p><strong>🤗 体感:</strong> ${getFeelsLike(temp)}</p>
                    <p><strong>📊 温度区分:</strong> ${getStatusText(temp)}</p>
                </div>
                <div style="background: #f0f8ff; padding: 15px; border-radius: 10px; border-left: 4px solid #4CAF50;">
                    <p><strong>💡 アドバイス:</strong></p>
                    <p>${getHealthAdvice(temp)}</p>
                </div>
            `;
}

// 健康アドバイス
function getHealthAdvice(temp) {
  if (temp <= 20) return "涼しい気候です。軽い運動や散歩に適しています。";
  if (temp <= 28) return "過ごしやすい気温です。屋外活動に最適な時期です。";
  if (temp <= 35)
    return "暑い日です。こまめな水分補給と適度な休憩を心がけましょう。";
  return "猛暑日です。外出は控えめに、エアコンを適切に使用し、熱中症対策を万全にしてください。";
}

// 気温更新
function updateTemperatures() {
  for (const region in currentTemperatures) {
    const data = temperatureData[region];
    const newTemp = data.temps[Math.floor(Math.random() * data.temps.length)];
    currentTemperatures[region] = newTemp;
  }

  generateTable();
  updateTimestamp();
}

// 温度順ソート
function sortByTemperature() {
  const sortedEntries = Object.entries(currentTemperatures).sort(
    ([, a], [, b]) => b - a
  );

  const newTemperatures = {};
  sortedEntries.forEach(([region, temp]) => {
    newTemperatures[region] = temp;
  });

  currentTemperatures = newTemperatures;
  generateTable();
}

// 地域順ソート
function sortByRegion() {
  const regionOrder = [
    "北海道",
    "東北",
    "関東",
    "中部",
    "関西",
    "中国",
    "四国",
    "九州",
    "沖縄",
  ];
  const newTemperatures = {};

  regionOrder.forEach((region) => {
    if (currentTemperatures[region] !== undefined) {
      newTemperatures[region] = currentTemperatures[region];
    }
  });

  currentTemperatures = newTemperatures;
  generateTable();
}

// タイムスタンプ更新
function updateTimestamp() {
  const now = new Date();
  const timeString = now.toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("lastUpdate").textContent = timeString;
}

// 初期化
document.addEventListener("DOMContentLoaded", function () {
  generateTable();
  updateTimestamp();
});
