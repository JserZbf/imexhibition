export const MOMENT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const APS_RESULT_DURATION = 7 * 24 * 60 * 60; // 排产结果时长（s）,暂定为7天
export const SIM_TIME_DURATION = 7 * 60; // 模拟时间轮播时长 暂定7分钟跑完全部7天数据
export const TIME_SCALE = APS_RESULT_DURATION / SIM_TIME_DURATION; // 真实时间每秒预模拟时间的比例
export const TIMER_INTERVAL = 3; // 定时器轮播间隔 暂定3秒
export const SIM_TIME_STEP = TIME_SCALE * TIMER_INTERVAL; // 定时器每次增加秒数

export const ONE_DAY_MILLISECOND = 86400000; // 24小时毫秒数
export const GANTT_SCROLL_INTERVAL = 60000; // 甘特图滚动定时器间隔
export const MIN_LEGEND_SCROLL_NUM = 26; // 图例最小开启滚动数
export const LEGEND_SCROLL_INTERVAL = 60; // 图例滚动定时器间隔
export const SECOND_SCROLL_HEIGHT = 3; // 图例每秒滚动高度
