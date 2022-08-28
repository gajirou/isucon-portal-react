import { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import app from "./app"
import { TeamModels } from "../models/model"

// リターン用オブジェクト
type TeamsScore = {
  teams: TeamModels,
  loading: boolean
};

const GetTeamScore = () => {
  // RealTimeDatabase の取得取得パス
  const path = "teams";
  // useState フックで問い合わせ結果を保持
  const [score, setScore] = useState<TeamsScore>({teams: {}, loading: false});

  // useEffect フックでデータを 1 回のみ取得
  useEffect(() => {
    const db = ref(getDatabase(app));
    get(child(db, path)).then((snapshot) => {
      if (snapshot.exists()) {
        // 問い合わせ結果と読み込み完了のフラグを設定
        const realTimeDatabase: TeamsScore = {teams: snapshot.val(), loading: true};
        setScore(realTimeDatabase);
      } else {
        console.log("データが存在しません。");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  return score;
};

export default GetTeamScore;