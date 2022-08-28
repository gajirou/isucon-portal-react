import { TeamModels, DataSets, teamDrowOptions } from "../models/model";

// 一時格納用データセットオブジェクト
type tmpDataSets = {
    [data: string]: DataSets
};

const CreateDrowData = (teams: TeamModels) => {
    let score        = 0;
    let beforeScore  = 0;
    let tmpDataHistory: tmpDataSets = {};
    let tmpDataLatest:  tmpDataSets = {};
    let tmpTimes:    Array<string>  = [];

    // 作成日時の hh:mm の配列作成
    for(const team of Object.keys(teams)) {
        for (const key of Object.keys(teams[team])) {
            const time = teams[team][key].timestamp.substring(11, 16);
            tmpTimes.push(time);
        }
    }

    // 重複を削除し hh:mm 昇順にソート
    const sortTimes = Array.from(new Set(tmpTimes.sort()));
    // チーム単位で作成日時ごとのスコアを格納
    for(const team of Object.keys(teams)) {
        // 履歴用オブジェクトに各項目にチームごとの設定値を代入
        tmpDataHistory[team] = {
            label:           teamDrowOptions[team].label,
            data:            [],
            borderColor:     teamDrowOptions[team].borderColor,
            backgroundColor: teamDrowOptions[team].backgroundColor
        }
        let setScoreflag = false;
        // 作成日時に合致するスコアを配列に追加
        for(const time of sortTimes) {
            for(const key of Object.keys(teams[team])) {
                console.log(key)
                // time が現在処理しているチームスコアの作成日時と一致するか判定
                if(teams[team][key].timestamp.includes(time)) {
                    score = teams[team][key].score;
                    setScoreflag = true;
                }
            }
            // 作成日時が現在処理中のレコードと合致した場合
            if(setScoreflag) {
                // 現在のスコアを設定
                tmpDataHistory[team].data.push(score);
                beforeScore = score;
            } else {
                // 1件前のスコアを設定
                tmpDataHistory[team].data.push(beforeScore);
            }
        }
        // 最新スコア用オブジェクトに各項目にチームごとの設定値を代入
        tmpDataLatest[team] = {
            label:           teamDrowOptions[team].label,
            data:            [score],
            borderColor:     teamDrowOptions[team].borderColor,
            backgroundColor: teamDrowOptions[team].backgroundColor
        }
    }

    // リターン用オブジェクトに編集結果を格納
    const drawObject = {
        labelHistory:    sortTimes,
        datasetsHistory: Object.values(tmpDataHistory),
        datasetsLatest : Object.values(tmpDataLatest).sort(
            (firstSortObj: DataSets, secondSortObj: DataSets) =>
            (firstSortObj?.data[0] > secondSortObj?.data[0]) ? -1 : 1
        )
    }
    return drawObject;
}

export default  CreateDrowData