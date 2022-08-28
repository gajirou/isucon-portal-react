// 「/teams/teamX/キー名/」配下の項目オブジェクト
type TeamDetaileModels = {
    pass:      string,
    score:     number,
    success:   string,
    fail:      string,
    messages:  string[],
    timestamp: string
};

// 「/teams/teamX/キー名」オブジェクト
type TeamKeyModels = {
    [keys: string]: TeamDetaileModels
};

// 「/teams/teamX」オブジェクト
type TeamModels = {
    [teams: string]: TeamKeyModels
};

// Chartjs の引数となるデータセット
type DataSets = {
    label:           string,
    data:            number[],
    borderColor:     string,
    backgroundColor: string
};

// グラフ表示用オプション
type TeamOption = {
    label:           string,
    borderColor:     string,
    backgroundColor: string
};

// チーム単位グラフ表示用
type TeamDrowOptions = {
    [teams: string]: TeamOption
};

// チームオブジェクト初期化
const teamDrowOptions: TeamDrowOptions = {};
teamDrowOptions["team1"] = {label: "team1", borderColor: "rgb(255, 99, 132)",  backgroundColor: "rgba(255, 99, 132, 0.5)"};
teamDrowOptions["team2"] = {label: "team2", borderColor: "rgb(53, 162, 235)",  backgroundColor: "rgba(53, 162, 235, 0.5)"};
teamDrowOptions["team3"] = {label: "team3", borderColor: "rgb(50, 205, 50)",   backgroundColor: "rgba(50, 205, 50, 0.5)"};
teamDrowOptions["team4"] = {label: "team4", borderColor: "rgb(255, 215, 0)",   backgroundColor: "rgba(255, 215, 0, 0.5)"};
teamDrowOptions["team5"] = {label: "team5", borderColor: "rgb(138, 43, 226)",  backgroundColor: "rgba(138, 43, 226, 0.5)"};
teamDrowOptions["team6"] = {label: "team6", borderColor: "rgb(139, 69, 19)",   backgroundColor: "rgba(139, 69, 19, 0.5)"};
teamDrowOptions["team7"] = {label: "team7", borderColor: "rgb(119, 136, 153)", backgroundColor: "rgba(119, 136, 153, 0.5)"};


export { TeamModels, DataSets, teamDrowOptions }