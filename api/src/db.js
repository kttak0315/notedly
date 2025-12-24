// src/db.js
const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // 1. [삭제] mongoose.set(...) 4줄은 최신 버전에서 필요 없습니다. (자동 적용됨)

    // 2. DB 연결
    // (연결이 성공했는지 로그로 남겨주면 확인하기 좋습니다)
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log('✅ MongoDB 연결 성공! (MongoDB Connected)');
      })
      .catch(err => {
        console.error('🚨 초기 연결 실패:', err);
      });

    // 3. 연결 중 에러 발생 감시
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
