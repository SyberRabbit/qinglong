// wecom_notify.js

const axios = require('axios');

// 从环境变量中获取 Webhook URL
// 如果环境变量 WECOM_WEBHOOK_URL 不存在，则使用一个默认值（这里用空字符串或一个占位符）
// 但强烈建议确保环境变量已设置
const WECOM_WEBHOOK_URL = process.env.WECOM_WEBHOOK_URL; // 移除默认值，强制要求设置环境变量

// 定义要发送的消息内容
const messageContent = {
  msgtype: 'text',
  text: {
    content: '青龙面板脚本运行通知：这是一个来自青龙面板的测试消息！',
  },
};

async function sendWeComNotification() {
  if (!WECOM_WEBHOOK_URL) {
    console.error('错误：未配置企业微信 Webhook URL。请在青龙面板环境变量中设置 WECOM_WEBHOOK_URL。');
    return;
  }

  try {
    console.log('正在发送企业微信通知...');
    const response = await axios.post(WECOM_WEBHOOK_URL, messageContent);

    if (response.data.errcode === 0) {
      console.log('企业微信通知发送成功！');
    } else {
      console.error('企业微信通知发送失败：', response.data);
      console.error('错误信息：', response.data.errmsg); // 打印具体的错误信息
    }
  } catch (error) {
    console.error('发送企业微信通知时发生错误：', error.message);
  }
}

// 脚本执行时调用通知函数
sendWeComNotification();
