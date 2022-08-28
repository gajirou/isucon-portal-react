# isucon-portal-react
ISUCON ポータル用に Firebase RealtimeDatabase に登録した bench の結果を取得し表示します。
## 開発環境起動
```
docker-compose up -d
docker-compose exec react ash
npm install
npm run dev
```

localhost:3000 にアクセスするとこんな感じとなります。（Firebase に ISUCON bench のデータが登録済の想定です）
![ポータルサイト](https://storage.googleapis.com/zenn-user-upload/22132a71a844-20220828.png)
## 静的ファイル作成
```
npm run build
```
