import React from "react";
import { Line } from "react-chartjs-2";
import { Bar }  from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import GetTeamScore from "./components/firebase/get-team-score"
import GetTime from "./components/parts/get-time"
import CreateHistory from "./components/service/create-drowdata"
Chart.register(...registerables);

type DrawData = {
  label:           string   | undefined,
  data:            number[] | undefined,
  borderColor:     string   | undefined,
  backgroundColor: string   | undefined
}[];

const App = () => {
  let drawObject;
  let drawDataHistory: DrawData = [];
  let drawDataLatest:  DrawData = [];

  // RealTimeDatabase からスコアデータ取得
  const score = GetTeamScore();

  // データ取得が完了していれば描画用オブジェクト作成
  if (score.loading) {
    // 履歴データ取得
    drawObject = CreateHistory(score.teams);
    // 履歴データの描画用オブジェクト
    for(let i = 0; i < drawObject.datasetsHistory.length; i++) {
      drawDataHistory.push({
        label:           drawObject?.datasetsHistory[i].label,
        data:            drawObject?.datasetsHistory[i].data,
        borderColor:     drawObject?.datasetsHistory[i].borderColor,
        backgroundColor: drawObject?.datasetsHistory[i].backgroundColor
      })
      // 最新スコア用データの描画用オブジェクト
      drawDataLatest.push({
        label:           drawObject?.datasetsLatest[i].label,
        data:            drawObject?.datasetsLatest[i].data,
        borderColor:     drawObject?.datasetsLatest[i].borderColor,
        backgroundColor: drawObject?.datasetsLatest[i].backgroundColor
      })
    }
  }

  // 履歴用 Chartjs パラメータ設定
  const dataHistory = {
    labels: drawObject?.labelHistory,
    datasets: drawDataHistory
  }

  // 履歴用グラフオプション
  const optionsHistory = {
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  }

  // 最新スコア用 Chartjs パラメータ設定
  const dataLatest = {
    labels: [""],
    datasets: drawDataLatest
  }

  // 最新スコア用グラフオプション
  const optionsLatest = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  };

  return (
      <div className="score">
          <h1>ISUCON Portal.</h1>
          <hr></hr>
          <h2>スコア経過</h2>
          <div className="chartscore">
            <Line
              height={45}
              width={200}
              options={optionsHistory}
              data={dataHistory}
            />
          </div>
          <h2>最新スコア</h2>
          <div className="lastscore">
            <Bar
              height={45}
              width={200}
              options={optionsLatest}
              data={dataLatest}
            />
          </div>
          <div className="time"><GetTime /></div>
      </div>
    );
}

export default App;