// ==UserScript==
// @name         洛奇猜灯谜2026中秋
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  洛奇答题辅助脚本
// @author       flandre
// @match        https://evt08.tiancity.com/luoqi/2651127/home/index.php*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// @grant        none
// ==/UserScript==
let isdebug = true; // 调试日志用
let debug = isdebug ? console.log.bind(console) : ()=>{}
(function() {
    'use strict';
    // 题库格式：{title:"题目原文", answer:"正确选项文本"}
    var qa =
        [
            {title:"迪尔科内尔的杂货店壁炉几根火柴",answer:"9"},
            {title:"众神离去的城市穆利阿斯，被灵魂占据并扎根的城市叫什么？",answer:"布里列赫"},
            {title:"嫦娥下凡",answer:"月季"},
            {title:"二月平",answer:"朋"},
            {title:"华夏中秋共赏月",answer:"观光"},
            {title:"掬水月在手",answer:"掌上明珠"},
            {title:"寂寞嫦娥舒广袖",answer:"单人舞"},
            {title:"举头望明月",answer:"高圆圆"},
            {title:"节日晚会露一手",answer:"挽"},
            {title:"举杯邀明月",answer:"赏光"},
            {title:"老有牙,小有牙,不老不小没有牙.",answer:"月亮"},
            {title:"猛将百余人，无事不出城。出城就放火，引灭自烧身。(打一日常用品)",answer:"火柴"},
            {title:"明月照我还",answer:"归有光"},
            {title:"明月松间照",answer:"黑白显影"},
            {title:"你共人女边着子",answer:"好闷"},
            {title:"清风拂面中秋夜",answer:"明月清风"},
            {title:"清风拂面中秋照",answer:"发扬光大"},
            {title:"日飞落树上",answer:"麻雀"},
            {title:"时逢中秋产于沪",answer:"海上升明月"},
            {title:"说马不像马",answer:"海马"},
            {title:"十五月亮照海滩",answer:"一盘散沙"},
            {title:"十五的月亮",answer:"正大光明"},
            {title:"什么东西拿起来越来越重",answer:"问题"},
            {title:"什么东西有头有尾却没有身体",answer:"袜子"},
            {title:"什么东西可以让你越来越强壮",answer:"知识"},
            {title:"什么东西可以给你帮助，却不能真正地站起来",answer:"知识"},
            {title:"什么东西可以拿在手里也可以放在口袋里",answer:"钥匙"},
            {title:"什么东西可以在地上爬，也能在树上爬",answer:"虫子"},
            {title:"什么东西熟睡时也不会停止工作",answer:"心脏"},
            {title:"什么东西越撒房间越亮",answer:"星星"},
            {title:"什么东西可以被打破",answer:"鸡蛋"},
            {title:"什么东西有头无脚",answer:"钉子"},
            {title:"什么东西轻飘飘",answer:"孔明灯"},
            {title:"有一个八个字的国家你知道是哪个国家嘛",answer:"印尼"},
            {title:"有种的上前来，要命的后面去",answer:"中秋"},
            {title:"一只,两个口。只装火,不装酒。打一日常用品",answer:"灯笼"},
            {title:"一轮明月挂中天",answer:"日涨盈亏"},
            {title:"一对明月毫不残",answer:"崩"},
            {title:"月与星相依,日与月共存",answer:"腥"},
            {title:"月二圆圆喜开镰",answer:"丰收在望"},
            {title:"月有阴晴圆缺",answer:"自负盈亏"},
            {title:"月到中秋",answer:"行行出状元"},
            {title:"月落日出雁阵业",answer:"胭"},
            {title:"月是故乡明",answer:"光照"},
            {title:"云破眉月倚西楼",answer:"私"},
            {title:"云盖中秋月，雨淋元宵灯",answer:"下落不明"},
            {title:"中秋朗月宾主共赏",answer:"正大光明"},
            {title:"中秋之夜开香槟",answer:"团圆酒"},
            {title:"中秋月色露生花",answer:"圆珠笔"},
            {title:"中秋佳节结良缘",answer:"重庆"},
            {title:"中秋度蜜月",answer:"花前月下"},
            {title:"中秋菊开",answer:"花好月圆"},
            {title:"中秋归来",answer:"八归"},
            {title:"中秋月饼",answer:"软盘"},
            {title:"望星空",answer:"高瞻远瞩"},
            {title:"“今夜月明人尽望，不知秋思落谁家”的作者是？",answer:"王建"},
            {title:"“但愿人长久”的下一句是？",answer:"千里共婵娟"},
            {title:"中秋节的月亮最圆最亮，所以中秋又叫什么节？",answer:"团圆节"},
            {title:"“露从今夜自”的下一句是？",answer:"月是故乡明"},
            {title:"本次生活赛季截止时间为？",answer:"2027年2月3日"},
            {title:"G28黄昏残墟在什么时候上线的?",answer:"2026年6月10号"},
            {title:"编年史任务中是谁与谁的战役？",answer:"图得南与皮尔波尔"},
            {title:"一天过去，脱件衣裳，一年过去，全身脱光。提示:物品",answer:"挂历"},
            {title:"小华的妈妈有三个孩子：大毛、二毛，第三个孩子叫什么？",answer:"小华"},
            {title:"圣诞夜，圣诞老公公放进袜子的第一件东西是什么?",answer:"脚"},
            {title:"什么东西不会说话却能回答你？",answer:"回声"},
            {title:"布里列赫地下城第二阶段的BOSS叫什么名字？",answer:"布隆塔纳斯"},
            {title:"布里列赫地下城掉落的材料可以制作成什么武器？",answer:"释魂者武器系列"},
            {title:"布里列赫地下城第三阶段的boss叫什么名字？",answer:"雷内恩的米耶尔"},
            {title:"蕾拉穿着什么颜色的裙子?",answer:"粉色"},
            {title:"哪种“钥匙”打不开门？",answer:"音乐的“调/键”"},
            {title:"小白鸡，托长尾，走一步，啄一嘴提示:物品",answer:"针"},
            {title:"保维德生活在哪个城市。",answer:"库拉"},
            {title:"铜矿石最多可以堆叠几个。",answer:"100个"},
            {title:"众神离去的城市穆利阿斯，被灵魂们占据并扎根的城市叫什么？",answer:"布里列赫"},
            {title:"迪尔科内尔的治疗所里有几张床。",answer:"3张"},
            {title:"一物真是妙，谁见都要笑，胖子变瘦子，高个变矮子。(打一科学产物)",answer:"哈哈镜"},
            {title:"打什么东西，不必花力气？",answer:"打瞌睡"},
            {title:"克鲁格的肩膀上有一只？",answer:"鹰"},
            {title:"状如半个球,伴人来吃饭,颜色白如雪,一日洗三遍。(打一生活物)",answer:"碗"},
            {title:"老有牙，小有牙,不老不小没有牙。(打一自然物)",answer:"月亮"},
            {title:"魔法的才能基础上结合链刃才能所施展出的才能是谁？",answer:"萝温"},
            {title:"什么人最喜欢日光浴？",answer:"植物人"},
            {title:"敦巴伦学校内的图书馆有几个水晶珠子。",answer:"4个"},
            {title:"你知道上课睡觉有什么不好吗？",answer:"不如床上舒服"},
            {title:"兄弟两人同走路，摆一摆来走一走，常年劳累不停歇，走来走去未出户提示:用具",answer:"钟"},
            {title:"武器大师活动中福格斯赠送的是什么武器？",answer:"福格凶武器"},
            {title:"一条怪牛，两条圆腿，骑他肚上，抓他双角。提示:交通工具",answer:"摩托车"},
            {title:"迪尔科内尔的村长的家里养了一只什么动物？",answer:"猫"},
            {title:"说鸟不是鸟，字里有个鸟。会画竹叶子，爱吃小虫子。(打一动物)",answer:"鸡"},
            {title:"敦巴伦的伊文前面有几个组队公告板",answer:"1个"},
            {title:"不是神仙能上天,腾云驾雾只等闲,崇山峻岭闪身后,万里行程一日还。(打一交通工具)",answer:"飞机"},
            {title:"两人很亲密,彼此不分离，它们一团聚,东西就分离。(打一工具)",answer:"剪刀"},
            {title:"哪个字人人都会写“错”？",answer:"错"},
            {title:"什么东西越洗越脏？",answer:"水"},
            {title:"菲利亚是一座什么种族居住的城市。",answer:"精灵"},
            {title:"艾明马恰的酒店的大门前有4份张贴的小广告。",answer:"4根"},
            {title:"埃文中有几个小型喷水池。",answer:"9个"},
            {title:"整个班格有几个炉子。",answer:"9个"},
            {title:"班格酒店的珍妮弗面前多少个瓶子",answer:"10个"},
            {title:"班格酒店的珍妮弗面前的柜台上挂了几个杯子。",answer:"13个"},
            {title:"巴勒斯银行门前有几个石质路灯",answer:"4个"},
            {title:"布里列赫地下城第一阶段的boss叫什么名字?",answer:"枯木之佩塔克"},
            {title:"把一只鸡和一只鹅同时放在冰箱里，为什么鸡死了鹅没死?",answer:"是企鹅嘛"},
            {title:"冰山雪莲提示:纺织品",answer:"花的确良"},
            {title:"不足为外人道也提示:纺织品",answer:"卡其布"},
            {title:"不闻机杼声提示:纺织品",answer:"无纺布"},
            {title:"不必花力气打的东西是什么?",answer:"打哈欠"},
            {title:"百岁老人会提示:食品",answer:"长寿面"},
            {title:"贝特林精英通行证最大可叠加数量是多少？",answer:"20个"},
            {title:"迪尔科内尔的迪丽斯的是一个？",answer:"医生"},
            {title:"迪尔科内尔的艾丽莎几岁了。",answer:"10岁"},
            {title:"地狱之门活动需要通关第几个主线任务后才能参与？",answer:"G22"},
            {title:"格伦贝尔纳地下城的最终boss叫什么名字？",answer:"凯莱赫"},
            {title:"格伦贝尔纳地下城在什么地方？",answer:"斯利比秘锡"},
            {title:"G27寂静庭院在什么时候上线的?",answer:"46240"},
            {title:"弓术的才能基础上结合战斗炼金术才能所施展出的才能是谁？",answer:"罗希内"},
            {title:"进入布里列赫地下城需要通过第几个主线任务?",answer:"G27"},
            {title:"近战才能的基础上结合魔法才能所施展出的阿尔卡纳才能是谁？",answer:"科雯娜"},
            {title:"近战的才能基础上结合祝福才能所施展出的才能是谁？",answer:"伊奥拉"},
            {title:"精灵形象变换栏最多可扩展至多少个？",answer:"20个"},
            {title:"可收纳500个花束的结实的花篮，可以在哪里购买？",answer:"贸易商人努努"},
            {title:"罗希内的日常工作什么？",answer:"看山人"},
            {title:"目前移动速度最快的宠物是什么？",answer:"茉茉"},
            {title:"牧师才能的基础上结合吟游诗人才能所施展出的才能是谁？",answer:"奥哈德"},
            {title:"骑乘飞行宠物可以飞到多少m的高空。",answer:"100.1m"},
            {title:"骑士枪的才能基础上结合双枪才能所施展出的才能是谁？",answer:"马特乌斯"},
            {title:"是谁最先发现了融合才能得可能性？",answer:"拉伊尔"},
            {title:"塔尼斯的武器是一把？",answer:"巨剑"},
            {title:"塔汀的卡尔芬使用的什么武器。",answer:"巨斧"},
            {title:"塔汀的多连的右手上带了几个戒指。",answer:"4个"},
            {title:"塔汀的多连身边一共有几个个反应炉。",answer:"6个"},
            {title:"塔汀的艾巴旁边一共有几个分离炉。",answer:"6个"},
            {title:"塔拉的巨石群临时司令部附近的祭坛周围有几根石柱。",answer:"8根"},
            {title:"塔拉广场的喷水池便有几面围栏。",answer:"12面"},
            {title:"塔拉广场有几个个木质座椅。",answer:"8个"},
            {title:"塔拉服装店旁边有几台手纺车。",answer:"2台"},
            {title:"完全恢复药水叠加上限是多少？",answer:"100瓶"},
            {title:"伊利雅大陆的克拉港口附近有很多什么树。",answer:"椰子树"},
            {title:"占星术士尼尔和迪莱尼是什么关系？",answer:"兄妹"},
            {title:"不是神仙能圣天，腾云驾雾只等闲，嵩山峻岭闪身后，万里行程一日还。（打一交通工具）",answer:"飞机"},
            {title:"大口小口，装油装酒。穿肠而过，半点不留。（打一物品）",answer:"漏斗"},
            {title:"哥俩一般高，每天三出操，人人都需要，团结互助好提示：打一物品",answer:"筷子"},
            {title:"平地盖起屋一间，小人做给大人看。",answer:"木偶戏"},
            {title:"墙上一朵牵牛花,一根藤儿连着它,没有叶儿没香味,能唱歌来会说话。提示:电讯用具",answer:"广播喇叭"},
            {title:"说像糖，它不甜,说象盐,又不咸,冬天时有,夏天谁都不见。",answer:"雪花"},
            {title:"四四方方，面上光光，长着四条腿，站着不出房。(打一家居用品)",answer:"桌子"},
            {title:"四个人在一间小屋里打麻将（没有其他人在看着），这时警察来了，四个人都跑了，可是警察到了屋里又抓到一个",answer:"警察抓的人叫“麻将”"},
            {title:"什么东西有“眼”却看不见？",answer:"蜘蛛"},
            {title:"什么东西只有一只“脚”？",answer:"伞"},
            {title:"什么路最窄？",answer:"冤家路窄"},
            {title:"什么事每人每天都必须认真的做？",answer:"睡觉"},
            {title:"什么事天不知地知，你不知我知？",answer:"鞋底破了"},
            {title:"什么蛋打不烂，煮不熟，更不能吃？",answer:"考试得的零蛋"},
            {title:"小男孩和小女孩在一起不能玩什么游戏? ",answer:"猜拳"},
            {title:"小牛犊，真特殊，垛垛小麦吃进肚，农民见它眯眯笑，喜看满天落珍珠提示:农机",answer:"脱粒机"},
            {title:"小小狗，依墙走，走一步，咬一口。(打一常用物)",answer:"剪刀"},
            {title:"新时白头发，旧时变成黑，闲时戴帽子，忙时把帽摘。提示:物品",answer:"毛笔"},
            {title:"新婚度蜜月",answer:"喜出望外"},
            {title:"兄弟四五人，各进一道门，要是进错了，定会笑死人提示:物品",answer:"纽扣"},
            {title:"象棉不是棉，名字蛮新鲜，石油提练出，抽丝在车间提示:化学制品",answer:"化学纤维"},
            {title:"一条带儿细又长，开动机器它又忙，你作报告它记录，一字一句不走样提示:电讯用具",answer:"录音机"},
            {title:"一个小黑孩，自小口不开，偶然一开口，跌出舌头来。(打一常用物品)",answer:"牙膏"},
            {title:"一位卡车司机撞倒一个骑摩托车的人，卡车司机受重伤，摩托车骑士却没事，为什么？",answer:"卡车司机当时没开车"},
            {title:"一间房子里，坐满小兄弟，摸同哪一个，都会生火气。(打一物品) ",answer:"火柴"},
            {title:"一字有六笔,笔笔是斜的,你要不知道,大家告诉你。(打一字)",answer:"众"},
            {title:"一双玉燕靠地飞，早上出门晚上归。提示:物品",answer:"鞋子"},
            {title:"一年四季都盛开的花是什么花？",answer:"月季"},
            {title:"怎么使麻雀安静下来?",answer:"压它-下"},
            {title:"左手五个，右手五个。拿去十个，还剩十个。(打一日常用品)",answer:"手套"},
            {title:"有一位年轻人流了400毫升的血,脸上却微笑着,一点事都没有,而且感觉很高兴?",answer:"无偿献血"},
            {title:"小兵一尺高，军装光闪耀，每当要冲锋，喊杀他最早提示:军用物",answer:"军号"},
            {title:"雷加图斯是一只什么颜色的龙。",answer:"蓝色"},
            {title:"里奥卡德有一双绿色的眼睛。",answer:"绿色"},
            {title:"得月楼前先得月",answer:"棚"},
            {title:"冬瓜、黄瓜、西瓜、南瓜都能吃，什么瓜不能吃？",answer:"傻瓜"},
            {title:"红娘子，上高楼。心里疼，眼泪流。（打一日常用品）",answer:"蜡烛"},
            {title:"火车由北京到上海需要6小时，行使3小时后，火车该在什么地方？",answer:"铁轨上"},
            {title:"你能做，我能做，大家都能做；一个人能做，两个人不能一起做。这是做什么？",answer:"做梦"},
            {title:"盆里有6只馒头，6个小朋友每人分到1只，但盆里还留着1只，为什么？",answer:"最后个小朋友把盆子端走了"},
            {title:"身上穿红袍，肚里真心焦，惹起心头火，跳得八丈高。（打一常用品）",answer:"爆竹"},
            {title:"身子大,架子大，珍珠项链胸前挂,到冬天,就掉架,没脸见人藏地下。(打一水果)",answer:"葡萄"},
            {title:"什么样钉子最可怕?",answer:"眼中钉"},
            {title:"小小孩儿真漂亮，五颜六色身细长，山水花鸟它能绘，表里如一有文章提示:文具",answer:"蜡笔"},
            {title:"早晨醒来，每个人都要做的第一件事是什么？",answer:"睁开眼睛"},
            {title:"布里列赫地下城第一阶段的boss叫什么？",answer:"枯木之佩塔克"},
            {title:"布里列赫地下城第二阶段的boss叫什么？",answer:"布隆塔纳斯"},
            {title:"进入布里列赫地下城需要通过第几个主线人物",answer:"G27"},
            {title:"地狱之门活动需要通关第几个主线",answer:"G22"},
            {title:"可收纳200个花束的结实的花篮，可以在哪里购买？",answer:"代伦，代尔"},
            {title:"埃文有几个小型喷水池",answer:"9"},
            {title:"艾明马恰得酒店的大门前有几张贴的小广告",answer:"4"},
            {title:"艾明马恰的酒店的大门J前有几张贴的小广告",answer:"4张"},
            {title:"艾明马恰的酒店的大门前有几张贴的小广告",answer:"4张"},
            {title:"巴勒斯的银行门前有几个石质的路灯",answer:"4个"},
            {title:"巴勒斯的银行前有几个石质的路灯",answer:"4个"},
            {title:"百分法 提示:文具名",answer:"圆规"},
            {title:"班格有几个炉子",answer:"9"},
            {title:"班格珍妮弗面前多少个瓶子",answer:"10"},
            {title:"嫦娥下凡(打一花名)",answer:"月季"},
            {title:"超级牙刷(打一成语)",answer:"一毛不拔"},
            {title:"穿梭酒场应杜绝提示:地方小吃",answer:"酸汤"},
            {title:"创业艰难百战多提示:饮料",answer:"成都大曲"},
            {title:"当哥伦布一只脚迈上新大陆后，紧接着做什么？",answer:"迈上另一只脚"},
            {title:"得月楼前先得月(打一字)",answer:"棚"},
            {title:"迪村杂货店壁炉几根火柴",answer:"9"},
            {title:"迪尔科内尔村长家几把摇椅",answer:"2"},
            {title:"迪尔科内尔的村长家里养了一只什么动物",answer:"猫"},
            {title:"迪尔科内尔的村长家里有几把摇椅。",answer:"二把"},
            {title:"迪尔科内尔的墓地里有几块墓碑。",answer:"10块"},
            {title:"迪尔科内尔的杂货店门前有几个罐子。",answer:"6个"},
            {title:"迪尔科内尔的杂货店内的壁炉中有几根木柴。",answer:"9根"},
            {title:"迪尔科内尔的杂货店前有几个罐子",answer:"6个"},
            {title:"迪尔科内尔的杂货店屋内挂了几只袋子在晾衣杆上。",answer:"15只"},
            {title:"迪尔科内尔治疗所有几张床",answer:"3"},
            {title:"冬天，宝宝怕冷，到了屋里也不肯脱帽。可是他见了一个人乖乖地脱下帽，那人是谁？",answer:"理发师"},
            {title:"敦巴伦的格莉纳斯胸前有一颗？",answer:"蓝宝石"},
            {title:"敦巴伦的格莉纳斯眼睛是什么颜色的。",answer:"棕色"},
            {title:"敦巴伦的治疗所里有几张床。",answer:"2张"},
            {title:"敦巴伦教堂前有几个长凳",answer:"四个"},
            {title:"敦巴伦食品店的吧台上边有几个瓶子。",answer:"9个"},
            {title:"敦巴伦学校门前有几个训练桩。",answer:"11个"},
            {title:"敦巴伦学校旁边有一 口什么形状的水井",answer:"方形"},
            {title:"敦巴伦伊文几个组队版",answer:"1"},
            {title:"多连有几个反应炉",answer:"6"},
            {title:"多连有几个戒指",answer:"4"},
            {title:"二月平(打一字)",answer:"朋"},
            {title:"飞机从天上掉下来，为什么没有一个受伤的？",answer:"全部死了"},
            {title:"菲利亚是一座什么种族的城市。",answer:"精灵"},
            {title:"华夏共赏中秋月(打一旅游用语)",answer:"观光"},
            {title:"鸡蛋壳有什么用处？",answer:"保护蛋清和蛋黄"},
            {title:"寂寞嫦娥舒广袖(打一舞蹈术语)",answer:"单人舞"},
            {title:"节日晚会露一手(打一字)",answer:"挽"},
            {title:"掬水月在手(打一成语)",answer:"掌上明珠"},
            {title:"举杯邀明月(打一礼貌用语)",answer:"赏光"},
            {title:"举头望明月(打电影演员)",answer:"高圆圆"},
            {title:"举头望明月(打一中药名)",answer:"当归"},
            {title:"克兰帝斯是一个？",answer:"精灵"},
            {title:"克鲁贞的船上一共有几件货物。",answer:"4件"},
            {title:"孔子与孟子有什么区别？",answer:"孔子的子在左边 孟子的子在上边"},
            {title:"口比肚子大，给啥就吃啥。它吃为了你，你吃端着它。(打一日常用品)",answer:"碗"},
            {title:"焅赛的头上插着什么颜色的羽毛。",answer:"粉红色"},
            {title:"焅赛头上插着什么颜色的羽毛",answer:"粉红色"},
            {title:"拉赫王城的藏书阁那有几根点燃的蜡烛。",answer:"7根"},
            {title:"拉赫王城的会客室有6把什么颜色的圆形座椅。",answer:"蓝色"},
            {title:"拉赫王城的会客室有六把什么颜色的圆形座椅",answer:"蓝色"},
            {title:"老虎最讨厌吃什么？",answer:"老鼠"},
            {title:"老头子哼哼哼，坐在火里不起身。(打一常用物品)",answer:"烧水壶"},
            {title:"老王一天要刮四五十次脸，脸上却仍有胡子。这是什么原因？",answer:"修面师"},
            {title:"雷加图斯是什么龙",answer:"蓝龙"},
            {title:"里奥卡德有一双什么颜色的眼睛",answer:"绿色"},
            {title:"满屋瘦娃娃，圆圆小脑瓜，出屋墙上划，开朵小金花。(打一常用物)",answer:"火柴"},
            {title:"毛毛虫回到家，对爸爸说了一句话，爸爸即场晕倒，毛毛虫说了什么话？",answer:"我要买鞋"},
            {title:"猛将百余人，无事不出城。出城就放火，引火自烧身。(打一日常用品)",answer:"火柴"},
            {title:"明天日全食(打一字)",answer:"月"},
            {title:"明天日全食",answer:"暗"},
            {title:"明月松间照(打摄影名词)",answer:"黑白显影"},
            {title:"明月照我还(打一明代人名)",answer:"归有光"},
            {title:"哪个房间没有门?",answer:"心房"},
            {title:"哪个字是中秋节的象征？",answer:"月"},
            {title:"哪一个月有二十八天？",answer:"每个月"},
            {title:"哪种水果最喜欢RAP?",answer:"葡萄"},
            {title:"你共人女边着子,怎知我门里添心(上下联各打一字)",answer:"好闷"},
            {title:"你能以最快速度，把冰变成水吗？",answer:"“冰”字去掉两点"},
            {title:"你能用蓝笔写出红字来吗？",answer:"写个“红”字有何难"},
            {title:"欧菲莉亚和哈姆雷特关系",answer:"恋人"},
            {title:"欧菲莉亚与哈姆雷特是什么关系。",answer:"恋人"},
            {title:"平日不思，中秋想你。有方有圆，又甜又蜜。(打一日常用品)",answer:"月饼"},
            {title:"汽车在右转弯时，哪只轮胎不转？",answer:"备胎"},
            {title:"清风拂面中秋夜(打一成语)",answer:"发扬光大"},
            {title:"清风拂面中秋夜(打一四字常用语)",answer:"发扬光大"},
            {title:"全力动员，上下一心提示:文化用品",answer:"贺卡"},
            {title:"拳击冠军很容易被谁击倒？",answer:"瞌睡虫"},
            {title:"却看妻子愁何在提示:调味品商标)",answer:"太太乐"},
            {title:"日飞落树上,夜晚到庙堂.不要看我小,有心肺肝肠.(打一动物名)",answer:"麻雀"},
            {title:"什么车子寸步难行？",answer:"风车"},
            {title:"什么东西不能吃？",answer:"“东西”方向"},
            {title:"什么东西即使在熟睡时也不会停止工作?",answer:"心脏"},
            {title:"什么东西可以被打破,却不能被碰触?",answer:"鸡蛋"},
            {title:"什么东西可以被点燃，却不会燃烧?",answer:"蜡烛"},
            {title:"什么东西可以翻来覆去，却不能动?",answer:"镜子"},
            {title:"什么东西可以给你帮助，却不能真正站起来?",answer:"知识"},
            {title:"什么东西可以拿在手里,也可以放在口袋里,但是却装不下口袋?",answer:"钥匙"},
            {title:"什么东西可以让你变得更高，却永远不会让你变成大人？",answer:"错误"},
            {title:"什么东西可以让你旅行千里，却不需要走一步?",answer:"地图"},
            {title:"什么东西可以让你越来越聪明，但用多了会变傻？",answer:"书"},
            {title:"什么东西可以让你越来越强壮,但也越来越轻?",answer:"知识"},
            {title:"什么东西可以让你越来越穷，却让你感觉越来越富有？",answer:"知识"},
            {title:"什么东西可以让你走出房间，却无法走出自己?",answer:"镜子"},
            {title:"什么东西可以让人在看到它时停下，但触摸不到它？",answer:"彩虹"},
            {title:"什么东西可以同时在上山和下海？",answer:"脚"},
            {title:"什么东西可以一眼就看到过去、现在和未来？",answer:"镜子"},
            {title:"什么东西可以一眼就看到未来",answer:"镜子"},
            {title:"什么东西可以在手中握住，却握不住在心中？",answer:"笑容"},
            {title:"什么东西可以在水里翻来覆去,却不会湿?",answer:"船"},
            {title:"什么东西可以在水上行走",answer:"船"},
            {title:"什么东西可以在一瞬间消失,但永远不会完全消失?",answer:"梦想"},
            {title:"什么东西没有体重，但可以托起整个地球?",answer:"想法"},
            {title:"什么东西拿起来会越来越重？",answer:"问题"},
            {title:"什么东西能把你关在外面?",answer:"锁"},
            {title:"什么东西能被点燃，但不能被吹灭？",answer:"想法"},
            {title:"什么东西能被点燃不能被吹灭",answer:"想法"},
            {title:"什么东西能穿越墙壁?",answer:"想法"},
            {title:"什么东西能上山也能下海",answer:"脚"},
            {title:"什么东西能在地上爬，也能在树上爬?",answer:"虫子"},
            {title:"什么东西能在家里、办公室和学校同时工作？",answer:"闹钟"},
            {title:"什么东西能在家里xx同时工作",answer:"闹钟"},
            {title:"什么东西你越撒，房间越亮？",answer:"星星"},
            {title:"什么东西轻飘飘，中秋夜会飞?",answer:"孔明灯"},
            {title:"什么东西随着用越多越多，却越来越少？",answer:"时间"},
            {title:"什么东西随着用越来越多却越来越少",answer:"时间"},
            {title:"什么东西无法用手触摸，但却能感受到？",answer:"音乐"},
            {title:"什么东西一边倒,就变成另一种东西?",answer:"杯子"},
            {title:"什么东西一到晚上就起床？",answer:"月亮"},
            {title:"什么东西永远不会回头？",answer:"时间"},
            {title:"什么东西有人却看不见?",answer:"想法"},
            {title:"什么东西有时是一个洞， 有时是两个洞，有时却没有洞?",answer:"袜子"},
            {title:"什么东西有头、脚，但没有身体？",answer:"袜子"},
            {title:"什么东西有头尾没有身体",answer:"数字"},
            {title:"什么东西有头无身，有尾无脚?",answer:"钉子"},
            {title:"什么东西有头无尾，一边白，一边黑?",answer:"矛盾"},
            {title:"什么东西有眼睛，但不能看?",answer:"锁孔"},
            {title:"什么东西圆又圆，中秋夜最圆",answer:"月亮"},
            {title:"什么东西越大越看不见",answer:"问题"},
            {title:"什么东西越多越轻？",answer:"空气"},
            {title:"什么东西在手里握着越紧，却越容易失去?",answer:"机会"},
            {title:"什么东西站得越高，看起来越矮?",answer:"高跟鞋"},
            {title:"什么东西站着时比躺着时高?",answer:"瀑布"},
            {title:"什么东西总是越来越小却永远不会变成零",answer:"音量"},
            {title:"什么东西总是越来越小却永远不会变零",answer:"音量"},
            {title:"什么东西走来走去，却从来不离开自己的位置?",answer:"道路"},
            {title:"什么东西走来走去,却一直在原地?",answer:"时钟"},
            {title:"什么东西走来走去不离开自己的位置",answer:"时钟"},
            {title:"什么东西走来走去一直在原地",answer:"时钟"},
            {title:"什么酒不能喝？",answer:"碘酒"},
            {title:"什么人生病从来不看医生？",answer:"盲人"},
            {title:"什么人始终不敢洗澡？",answer:"泥人"},
            {title:"什么少用可以聪明多用会变傻",answer:"书"},
            {title:"什么样的人死后还会出现？",answer:"电影中的人"},
            {title:"什么英文字母最多人喜欢听？",answer:"CD"},
            {title:"生在山崖，落在人家。凉水浇背，千刀万剐。(打一日常用品)",answer:"磨刀石"},
            {title:"十五的月亮(打成语)",answer:"正大光明"},
            {title:"十五月亮照海滩（打一成语）",answer:"一盘散沙"},
            {title:"时逢中秋产于沪(五言唐诗句)",answer:"海上生明月"},
            {title:"时钟什么时候不会走?",answer:"时钟本来就不会走"},
            {title:"世界上最小的岛是什么？",answer:"瑙鲁"},
            {title:"书店里买不到什么书？",answer:"遗书"},
            {title:"说马不像马,路上没有它.若用它做药,要到海中抓.(打一动物名)",answer:"海马"},
            {title:"四个小瘦子，合戴顶帽子。(打一家居用品)",answer:"桌子"},
            {title:"塔拉的治疗所门上有一个什么颜色药水瓶的标记。",answer:"蓝色"},
            {title:"塔拉广场喷水池几面围栏",answer:"12面"},
            {title:"塔拉广场上有几个个木质座椅。",answer:"8个"},
            {title:"塔拉广场上有几个木质座椅",answer:"8"},
            {title:"塔拉广场有几个木椅",answer:"8"},
            {title:"塔拉巨石群几个石柱",answer:"8"},
            {title:"塔拉杂货店的楼梯上铺设的是什么颜色的地毯。",answer:"绿色"},
            {title:"塔拉杂货店的盘子货架上蓝色的盘子有几个。",answer:"3个"},
            {title:"塔汀的艾巴旁边一共有6分分离炉。",answer:"6个"},
            {title:"塔汀的多连的右手上至少带了几个戒指",answer:"4"},
            {title:"塔汀的多连身边一共有几个反应炉",answer:"6个"},
            {title:"太平洋的中间是什么？",answer:"是平字"},
            {title:"头大尾细，全身生疥。拿起索子，跟你讲价。(打一日常用品)",answer:"秤"},
            {title:"外麻里光，住在闺房。姑娘怕戳疼，拿它来抵挡。(打一日常用品)",answer:"顶针"},
            {title:"弯月照枝头亮， 两颗星悬天下明",answer:"秋"},
            {title:"万兽大王是谁？",answer:"动物园园长"},
            {title:"望星空(打一成语)",answer:"高瞻远瞩"},
            {title:"为什么小王从初一到初三就学了一篇课文？",answer:"初一到初三，两天学一课，算不错了"},
            {title:"小华在家里，和谁长得最像？",answer:"自己"},
            {title:"小明从不念书却得了模范生，为什么？",answer:"小明是聋哑学生"},
            {title:"小明知道试卷的答案，为什么还频频看同学的？",answer:"小明是老师"},
            {title:"小小狗，手里走。走一走，咬一口。(打一日常用品)",answer:"剪刀"},
            {title:"新婚度蜜月,中秋游异邦(打成语)",answer:"喜出望外"},
            {title:"新婚度蜜月，中秋游异邦",answer:"喜出望外"},
            {title:"一对明月毫不残，落在山下左右站(打一字)",answer:"崩"},
            {title:"一个人从飞机上掉下来，为什么没摔死呢？",answer:"飞机停在地上"},
            {title:"一个人空腹最多能吃几个鸡蛋？",answer:"一个"},
            {title:"一个人在沙滩上行走，但在他的身后却没有发现脚印，为什么？",answer:"他在倒着走"},
            {title:"一棵麻，多枝丫。雨一淋，就开花。(打一日常用品)",answer:"雨伞"},
            {title:"一轮明月挂中天(打一股市术语)",answer:"日涨盈亏"},
            {title:"一条怪牛，两条圆腿，骑他肚上，抓他双角。提示:物品",answer:"摩托车"},
            {title:"一弯月照枝头亮，两颗星悬天下明(打一字)",answer:"秋"},
            {title:"一物三口，有腿无手。谁要没它，难见亲友。(打一日常用品)",answer:"裤子"},
            {title:"一只罐，两个口。只装火，不装酒。(打一日常用品)",answer:"灯笼"},
            {title:"一只黑狗，两头开口。一头咬煤，一头咬手。(打一日常用品)",answer:"火钳"},
            {title:"伊利雅克拉港口附近有很多什么树",answer:"椰子树"},
            {title:"用什么可以解开所有的谜？",answer:"答案"},
            {title:"用铁锤锤鸡蛋为什么锤不破?",answer:"铁锤当然不会破了"},
            {title:"有一个八个字的国家，你知道是哪个国家吗?",answer:"印尼"},
            {title:"有一个字，人人见了都会念错。这是什么字？",answer:"错"},
            {title:"有种的上前来，要命的后面去 （打一节日）",answer:"中秋"},
            {title:"又白又软，罩住人脸。守住关口，防止传染。(打一日常用品)",answer:"口罩"},
            {title:"远看像八卦，近看像车轮，惯做风流事，人人都爱它。(打一电器)",answer:"电风扇"},
            {title:"月到中秋(打一俗语五字)",answer:"行行出状元"},
            {title:"月儿圆圆喜开镰 (打一成语)",answer:"丰收在望"},
            {title:"月落日出雁阵业(打一字)",answer:"胭"},
            {title:"月是故乡明(打一农业名词)",answer:"光照"},
            {title:"“月有阴晴圆缺”的下一句是？",answer:"此事古难全"},
            {title:"月有阴晴圆缺(打经济学名词)",answer:"自负盈亏"},
            {title:"月与星相依，日和月共存(打一字)",answer:"腥"},
            {title:"云盖中秋月，雨淋元宵灯(打一成语)",answer:"下落不明"},
            {title:"云破眉月倚西楼(打一字)",answer:"私"},
            {title:"长安一片月(打《水浒》人物名)",answer:"秦明"},
            {title:"中秋度蜜月(打一成语)",answer:"花前月下"},
            {title:"中秋归来(打一词牌名)",answer:"八归"},
            {title:"中秋过后又重阳(打一郑板桥诗句)",answer:"一节复一节"},
            {title:"中秋佳节结良缘(打一城市名)",answer:"重庆"},
            {title:"中秋菊开(打一成语)",answer:"花好月圆"},
            {title:"中秋朗月，宾主共赏（打一成语）",answer:"正大光明"},
            {title:"中秋月饼(打一电脑名词)",answer:"软盘"},
            {title:"中秋月色露生花(打一文具名)",answer:"圆珠笔"},
            {title:"中秋月夜座谈会(打一气象用语)",answer:"明晚多云"},
            {title:"中秋月夜座谈会",answer:"明晚多云"},
            {title:"中秋照海滩",answer:"一盘散沙"},
            {title:"中秋之夜开香槟(打三字民俗)",answer:"团圆酒"},
            {title:"一个人在冬天泡了一小时冷水澡，却一点也不觉得冷，为什么？",answer:"他泡的是室外温泉池"},
            {title:"布里列赫地下城第二阶段得BOSS叫什么名字？",answer:"布隆"},
            {title:"《望月怀远》的作者是？",answer:"张九龄"},
            {title:"普通服饰等级升级至时尚服饰等级需要消耗几个普通工坊布料？",answer:"4"},
            {title:"以下哪种农产品不是塔汀农场中产出的？",answer:"绿梨"},
            {title:"“今夜月明人尽望”的下一句是？",answer:"不知秋思落谁家"},
            {title:"小明的爸爸有三个儿子，老大叫大明，老二叫二明，老三叫什么？",answer:"小明"},
            {title:"海上升明月，天涯共此时的作者是谁？",answer:"张九龄"},
            {title:"中秋之夜最不容易看清的是什么？",answer:"太阳"},
            {title:"《静夜思》的作者是？",answer:"李白"},
            {title:"“不知天上宫阙”的下一句是？",answer:"今夕是何年"},
            {title:"中秋节的月亮最圆最亮，所以中秋节又叫什么节？",answer:"团圆节"},
            {title:"当前赛季名称为？",answer:"卢娜萨1赛季"},
            {title:"房间里有十根点燃的蜡烛，风吹灭了三根，第二天早上还剩几根？",answer:"三根"},
            {title:"什么东西一冷就变硬、一热就变软？",answer:"冰块"},
            {title:"中秋月饼多为圆形，象征什么？",answer:"团圆"},
            {title:"中秋赏月时，人们最常吃的水果是？",answer:"柚子"},
            {title:"“空山新雨后”的下一句是？",answer:"天气晚来秋"},
            {title:"“嫦娥奔月”的故事里，嫦娥服下的仙药来自？",answer:"西王母"},
            {title:"农历八月十五是中秋节，农历八月又叫什么月？",answer:"仲秋"},
            {title:"“海上生明月”的下一句是？",answer:"天涯共此时"},
            {title:"生活协会稀有采集物，从哪个评级就可以进入？",answer:"专家"},
            {title:"我国现存规模最大、保存最完整的古代宫殿建筑群是？",answer:"故宫，"},
            {title:"苏轼的《水调歌头》是为怀念谁而作？",answer:"弟弟苏辙"},
            {title:"画时圆，写时方，冬时短，夏时长，打一字",answer:"日"},
            {title:"“春风又绿江南岸”的下一句是？",answer:"明月何时照我还"},
            {title:"《史记》的作者是？",answer:"司马迁"},
            {title:"当前唯一套可以变更风格服饰是？",answer:"终极命运服饰"},
            {title:"一家十一口，打一字",answer:"吉"},
            {title:"在塔汀农场中的NPC叫什么名字？",answer:"布拉得"},
            {title:"从一楼到四楼要走三层，用三分钟，那么从一楼到八楼要几分钟？",answer:"七分钟"},
            {title:"从一楼走到三楼要用三分钟，那么从一楼走到六楼要几分钟？",answer:"七分半钟"},
            {title:"哪个传统节日必须抬头看天？",answer:"中秋节"},
            {title:"“嫦娥应悔偷灵药”的下一句是？",answer:"碧海青天夜夜心"},
            {title:"千里相逢，打一字",answer:"重"},
            {title:"塔汀农场共有几种农作物？",answer:"7"},
            {title:"神秘工坊系统更新后，服饰共分为几个等级？",answer:"5"},
            {title:"至尊服饰最多能设定几个动作顺序？",answer:"5"},
            {title:"“转朱阁，低绮户”的下一句是？",answer:"照无眠"},
            {title:"二十四节气中，一年中白天最长的是？",answer:"夏至"},
            {title:"端午节与我国古代哪位历史人物有关？",answer:"屈原"},
            {title:"“但愿人长久，千里共婵娟”出自哪位词人？",answer:"苏轼"},
            {title:"我国古代四大发明中，用于航海定向的是？",answer:"指南针"},
            {title:"九十九，打一字",answer:"白"},
            {title:"月落乌啼霜满天，的下一句",answer:"江枫渔火对愁眠"},
            {title:"“秦时明月汉时关”的作者是？",answer:"王昌龄"},
            {title:"“秦时明月汉时关”的下一句是？",answer:"万里长征人未还"},
            {title:"帕伊亚的黄金裁缝工具箱售价为？",answer:"100万金币"},
            {title:"十个哥哥，打一字",answer:"克"},
            {title:"借问酒家何处有，的下一句？",answer:"牧童遥指杏花村"},
            {title:"黑莓汁可以在哪个魔法锅中生产？",answer:"丰饶的魔法锅"},
            {title:"塔汀农场中有几个魔法锅？",answer:"4"},
            {title:"今夜月明人尽望不知秋思落谁家，的作者？",answer:"王建"},
            {title:"进战才能的基础结合魔法才能所施展出的阿尔卡纳才能是谁？",answer:"科雯娜"},
            {title:"山上还有山，打一字",answer:"出"},
            {title:"“每逢佳节倍思亲”里的“佳节”指哪个节日？",answer:"重阳节"},
            {title:"“露从今夜白”的下一句是？",answer:"月是故乡明"},
            {title:"“人有悲欢离合”的下一句是？",answer:"月有阴晴圆缺"},
            {title:"什么“牛”最厉害？",answer:"吹牛"},
            {title:"半推半就，打一字",answer:"扰"},
            {title:"成语“精卫填海”中的精卫是什么变成的？",answer:"鸟"},
            {title:"一根绳子对折三次后从中间剪一刀，会变成几段？",answer:"九段"},
            {title:"“婵娟”在“千里共婵娟”里指的是？",answer:"月亮"},
            {title:"他用一支笔就写出了两种颜色的字，怎么做到的？",answer:"那是一只双色笔"},
            {title:"《论语》记录的主要是谁的言行？",answer:"孔子"},
            {title:"传说中夸父追逐的是什么？",answer:"太阳"},
            {title:"我国历史上第一个统一的封建王朝是？",answer:"秦朝"},
            {title:"魔法锅中被锁定的配方需要使用什么进行解锁？",answer:"生活协会钥匙"},
            {title:"《水调歌头·明月几时有》写于哪个传统节日前？",answer:"中秋节"},
            {title:"我国古代科举考试中，殿试第一名称为？",answer:"状元"},
            {title:"传说中射下九个太阳、与中秋有关的人物是？",answer:"后羿"},
            {title:"生活协会每间隔多久会评审一次名匠？",answer:"两周"},
            {title:"中国历史上被称为“诗仙”的是？",answer:"李白"},
            {title:"提出“民为贵，社稷次之，君为轻”的思想家是？",answer:"孟子"},
            {title:"“明月松间照”的下一句是？",answer:"清泉石上流"},
            {title:"一加一，打一字",answer:"王"},
            {title:"买了一只鸡回家，到家却变成了两只，为什么？",answer:"鸡在路上下了个蛋"},
            {title:"“借问酒家何处有”的下一句是？",answer:"牧童遥指杏花村"},
            {title:"“江天一色无纤尘”的下一句是？",answer:"皎皎空中孤月轮"},
            {title:"目前已有多少位阿尔卡纳",answer:"10"},
            {title:"布里列赫地下城第四阶段的BOSS叫什么名字？",answer:"雷内恩的米耶尔：悔恨"},
            {title:"“清明时节雨纷纷”的下一句是？",answer:"路上行人欲断魂"},
            {title:"中秋节吃月饼的习俗与哪个历史事件有关？",answer:"元末起义传递消息"},
            {title:"申请名匠评审时，需要找哪位NPC申请？",answer:"克罗姆"},
            {title:"“春江潮水连海平”的下一句是？",answer:"海上明月共潮生"},
            {title:"“湖光秋月两相和”的下一句是？",answer:"潭面无风镜未磨"},
            {title:"相传中秋节是从哪个朝代开始盛行赏月的？",answer:"唐朝"},
            {title:"树上有十只鸟，打下三只后，树上还剩几只？",answer:"一只也没有"},
            {title:"生活协会季节收集物共有几种物品？",answer:"14"},
            {title:"二十四节气中，表示秋天开始的是？",answer:"立秋"},
            {title:"基础专家效果共有几种？",answer:"6"},
            {title:"中国古代神话中，偷吃仙药飞上月宫的是？",answer:"嫦娥"},
            {title:"什么东西只有在中秋之夜才最圆？",answer:"月亮"},
            {title:"圣盾骑士新增的技能名称是？",answer:"高贵的誓约"},
            {title:"“海上生明月，天涯共此时”寄托的是什么感情？",answer:"思念远方的人"},
            {title:"“海上生明月，天涯共此时”的作者是？",answer:"张九龄"},
            {title:"日月同辉，打一字",answer:"明"},
            {title:"完成《布罗妮的成长支援》的第几卷后，才能接到生活协会的邀请任务？",answer:"3"},
            {title:"什么“火”不能用来取暖？",answer:"发火"},
            {title:"“万里长城”最早是在哪个朝代大规模修筑的？",answer:"秦朝"},
            {title:"当前服饰最高等级为？",answer:"至尊"},
            {title:"潮流服饰最多能设定几个动作顺序？",answer:"3"},
            {title:"一个数减去它自己，再乘以随便哪个数，结果是多少？",answer:"零"},
            {title:"中秋圆月常被古人比作？",answer:"玉盘"},
            {title:"“月上柳梢头”的下一句是？",answer:"人约黄昏后"},
            {title:"一人在内，打一字",answer:"肉"},
            {title:"“生活协会”在哪个城镇？",answer:"塔拉"},
            {title:"有个人养了十只鸡，却天天能捡到十个鸭蛋，为什么？",answer:"他养的其实是鸭子"},
            {title:"秦始皇统一六国后，全国统一使用的文字是？",answer:"小篆"},
            {title:"两对父子去吃饭，只点了三份套餐，为什么？",answer:"祖孙三代一共三个人"},
            {title:"“月落乌啼霜满天”的下一句是？",answer:"江枫渔火对愁眠"},
            {title:"“独在异乡为异客”的下一句是？",answer:"每逢佳节倍思亲"},
            {title:"三颗药要每半小时吃一颗，多久能吃完？",answer:"一小时"},
            {title:"黑魔导士新增的技能名称是？",answer:"烬火引燃"},
            {title:"本次的潘签到活动，送的是哪位的服饰？",answer:"伊奥拉"},
            {title:"“不应有恨”的下一句是？",answer:"何事长向别时圆"},
            {title:"北京故宫又被称为什么城？",answer:"紫禁城"},
            {title:"传说中在月宫里砍桂树的人是谁？",answer:"吴刚"},
            {title:"传说中月宫里陪伴嫦娥的动物是？",answer:"玉兔"},
            {title:"普通工坊布料和时尚工坊布料可以在哪个NPC购买",answer:"西蒙"},
            {title:"“举头望明月”的下一句是？",answer:"低头思故乡"},
            {title:"什么“门”最热闹？",answer:"热门"},
            {title:"《春江花月夜》的作者是？",answer:"张若虚"},
            {title:"“野旷天低树”的下一句是？",answer:"江清月近人"},
            {title:"一口咬掉牛尾巴，打一字",answer:"告"},
            {title:"灯谜“说像糖，它不甜，说像盐，又不咸”的谜底是？",answer:"雪花"},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
        ];
    debug("洛奇猜灯谜助手已加载。答题结束后可输入 dumpQA() / copyNewQA()");

    function stopQATimeout()
    {
        try {
            if (window.timer) {
                clearInterval(window.timer);
                window.timer = null;
                debug("已停止倒计时定时器");
            }
            window.CountDown = function() {};
            window.maxtime = 99999;
        } catch(e) {
            debug("停止定时器失败:", e);
        }
    }

    function cleanText(text)
    {
        if (!text) return '';
        return String(text).replace(/[\s\.,;:!?！？。，、；：""''「」『』（）\(\)\[\]【】《》<>…—\-]/g, '').trim().toLowerCase();
    }

    function stripHtml(html)
    {
        if (!html) return '';
        var tmp = document.createElement('div');
        tmp.innerHTML = String(html);
        return (tmp.textContent || tmp.innerText || '').trim();
    }

    function extractOptionText(htmlOrText)
    {
        var text = stripHtml(htmlOrText);
        return text.replace(/^[A-Da-d](?:[)）．、.．:\s]+|(?=[\u4e00-\u9fff]))/, '').trim();
    }

    function showTip(html)
    {
        if ($('#auto-answer-tip').length === 0) {
            $('body').append('<div id="auto-answer-tip" style="position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: #00ff00; padding: 12px 24px; font-size: 20px; font-weight: bold; z-index: 99999; border-radius: 10px; box-shadow: 0 0 20px rgba(0,255,0,0.5); pointer-events: none;"></div>');
        }
        $('#auto-answer-tip').html(html).stop(true, true).fadeIn(300);
        setTimeout(function() {
            $('#auto-answer-tip').fadeOut(300);
        }, 3000);
    }

    function getApiOptions(obj)
    {
        return [obj.option1, obj.option2, obj.option3, obj.option4];
    }

    function resolveAnswer(answer, obj)
    {
        if (!answer) return null;
        var letter = String(answer).trim().toLowerCase();
        if (letter === 'a' || letter === 'b' || letter === 'c' || letter === 'd') {
            var idx = 'abcd'.indexOf(letter);
            return {
                data: String(idx + 1),
                label: letter.toUpperCase(),
                text: extractOptionText(getApiOptions(obj)[idx] || '')
            };
        }

        var cleanAnswer = cleanText(answer);
        var opts = getApiOptions(obj);
        var i, cleanOption, rawText;
        for (i = 0; i < opts.length; i++) {
            if (opts[i] == null || opts[i] === '' || opts[i] === 'null') continue;
            rawText = extractOptionText(opts[i]);
            cleanOption = cleanText(rawText);
            if (!cleanOption) continue;
            if (cleanOption === cleanAnswer || cleanOption.indexOf(cleanAnswer) !== -1 || cleanAnswer.indexOf(cleanOption) !== -1) {
                return {
                    data: String(i + 1),
                    label: 'ABCD'.charAt(i),
                    text: rawText
                };
            }
        }
        return { data: null, label: '', text: answer, fallbackText: answer };
    }

    function markCorrect(resolved)
    {
        var $opt;
        if (resolved.data) {
            $opt = $("#layer1 .option a[data='" + resolved.data + "']");
            if (!$opt.length) {
                $opt = $("#layer1 .option a:eq(" + (parseInt(resolved.data, 10) - 1) + ")");
            }
        }

        if ((!$opt || !$opt.length) && resolved.fallbackText) {
            var cleanAnswer = cleanText(resolved.fallbackText);
            $("#layer1 .option a").each(function() {
                var rawText = extractOptionText($(this).html() || $(this).text());
                var cleanOption = cleanText(rawText);
                debug("选项全文：" + $(this).text() + " 清理后：" + cleanOption + " 答案清理后：" + cleanAnswer);
                if (cleanOption && (cleanOption === cleanAnswer || cleanOption.indexOf(cleanAnswer) !== -1 || cleanAnswer.indexOf(cleanOption) !== -1)) {
                    $opt = $(this);
                    resolved.label = 'ABCD'.charAt($("#layer1 .option a").index(this));
                    resolved.text = rawText;
                    return false;
                }
            });
        }

        if ($opt && $opt.length) {
            $opt.addClass('correct');
            var tip = '正确答案：选项 ' + (resolved.label || '') + (resolved.text ? ' ' + resolved.text : '');
            console.log("%c" + tip, "color: #00ff00; font-size: 20px; font-weight: bold;");
            showTip('正确答案：选项 ' + resolved.label);
        } else {
            console.log("%c未找到匹配的答案：" + (resolved.text || resolved.fallbackText || ''), "color: #ff9900; font-size: 16px; font-weight: bold;");
        }
    }

    function pickAnswer(item)
    {
        if (item.answer) return item.answer;
        return item.option || null;
    }

    function findQaAnswer(title)
    {
        var cleanTitle = cleanText(title);
        if (!cleanTitle) return null;
        var i, cleanQaTitle, answer, exactAnswer, fuzzyAnswer;

        for (i = 0; i < qa.length; i++) {
            if (!qa[i].title) continue;
            answer = pickAnswer(qa[i]);
            if (!answer) continue;
            cleanQaTitle = cleanText(qa[i].title);
            if (cleanTitle === cleanQaTitle) {
                if (qa[i].answer) {
                    debug("找到题目精确匹配：" + title + " 答案：" + answer);
                    return answer;
                }
                if (!exactAnswer) exactAnswer = answer;
            }
        }
        if (exactAnswer) {
            debug("找到题目精确匹配：" + title + " 答案：" + exactAnswer);
            return exactAnswer;
        }

        for (i = 0; i < qa.length; i++) {
            if (!qa[i].title) continue;
            answer = pickAnswer(qa[i]);
            if (!answer) continue;
            cleanQaTitle = cleanText(qa[i].title);
            if (cleanTitle.length > 5 && cleanQaTitle.length > 5) {
                if (cleanTitle.indexOf(cleanQaTitle) !== -1 || cleanQaTitle.indexOf(cleanTitle) !== -1) {
                    if (qa[i].answer) {
                        debug("找到题目模糊匹配：" + title + " 答案：" + answer);
                        return answer;
                    }
                    if (!fuzzyAnswer) fuzzyAnswer = answer;
                }
            }
        }
        if (fuzzyAnswer) {
            debug("找到题目模糊匹配：" + title + " 答案：" + fuzzyAnswer);
        }
        return fuzzyAnswer || null;
    }

    function findQaExact(title)
    {
        var cleanTitle = cleanText(title);
        if (!cleanTitle) return null;
        for (var i = 0; i < qa.length; i++) {
            if (!qa[i].title) continue;
            if (cleanText(qa[i].title) === cleanTitle) return pickAnswer(qa[i]);
        }
        return null;
    }

    var pendingQuestion = null;
    var sessionRecords = [];

    function escapeQa(text)
    {
        return String(text == null ? '' : text).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    function formatQaLine(item)
    {
        return '{title:"' + escapeQa(item.title) + '",answer:"' + escapeQa(item.answer) + '"},';
    }

    function rememberPending(obj)
    {
        if (!obj || !obj.subject) return;
        pendingQuestion = {
            title: obj.subject,
            options: getApiOptions(obj)
        };
    }

    function recordFromAnswer(obj)
    {
        if (!pendingQuestion || obj.answer === undefined) return;
        var idx = parseInt(obj.answer, 10) - 1;
        var answerText = extractOptionText((pendingQuestion.options && pendingQuestion.options[idx]) || '');
        if (!pendingQuestion.title || !answerText) {
            debug("记录题目失败", pendingQuestion, obj.answer);
            return;
        }
        var rec = {
            title: pendingQuestion.title,
            answer: answerText
        };
        var recKey = cleanText(rec.title);
        for (var i = 0; i < sessionRecords.length; i++) {
            if (cleanText(sessionRecords[i].title) === recKey) {
                sessionRecords[i] = rec;
                debug("更新本轮记录：", rec.title, rec.answer);
                return;
            }
        }
        sessionRecords.push(rec);
        debug("记录本轮题目：", rec.title, rec.answer, findQaExact(rec.title) ? "(已存在)" : "(未收录)");
    }

    function splitRecords()
    {
        var missing = [];
        var exist = [];
        for (var i = 0; i < sessionRecords.length; i++) {
            if (findQaExact(sessionRecords[i].title)) exist.push(sessionRecords[i]);
            else missing.push(sessionRecords[i]);
        }
        return { missing: missing, exist: exist };
    }

    function dumpQA()
    {
        var split = splitRecords();
        var missingText = split.missing.map(formatQaLine).join('\n');
        var existText = split.exist.map(formatQaLine).join('\n');
        console.log("%c===== 未收录（可直接粘贴到题库） " + split.missing.length + " =====", "color: #ff6600; font-size: 16px; font-weight: bold;");
        console.log(missingText || "(无)");
        console.log("%c===== 已存在 " + split.exist.length + " =====", "color: #00aa00; font-size: 16px; font-weight: bold;");
        console.log(existText || "(无)");
        return { missing: split.missing, exist: split.exist, text: missingText };
    }

    function copyNewQA()
    {
        var split = splitRecords();
        var text = split.missing.map(formatQaLine).join('\n');
        if (!text) {
            console.log("没有未收录题目");
            return '';
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                console.log("%c已复制 " + split.missing.length + " 条未收录题目", "color: #00aa00; font-size: 14px; font-weight: bold;");
            }).catch(function() {
                console.log(text);
            });
        } else {
            console.log(text);
        }
        return text;
    }

    window.dumpQA = dumpQA;
    window.copyNewQA = copyNewQA;
    window.qaSession = sessionRecords;

    function handleQuestion(obj)
    {
        if (!obj || typeof obj !== 'object' || obj.irv !== 200) return;

        if (obj.answer !== undefined) {
            recordFromAnswer(obj);
        }

        if (obj.answer !== undefined && Number(obj.num) === 0) {
            pendingQuestion = null;
            console.log("%c本轮结束。输入 dumpQA() 查看记录，copyNewQA() 复制未收录题目。", "color: #00ccff; font-size: 14px; font-weight: bold;");
            dumpQA();
            return;
        }

        if (obj.subject == null) return;
        rememberPending(obj);

        stopQATimeout();
        var answer = findQaAnswer(obj.subject);
        if (!answer) {
            debug("未找到题目：\"" + obj.subject + "\"");
            console.log("%c题库中未找到此题目！题目：" + obj.subject, "color: #ff0000; font-size: 16px; font-weight: bold;");
            return;
        }

        var resolved = resolveAnswer(answer, obj);
        var delay = (obj.answer !== undefined) ? 2300 : 300;
        debug("将在 " + delay + "ms 后标记答案", resolved);
        setTimeout(function() {
            stopQATimeout();
            markCorrect(resolved);
        }, delay);
    }

    function hookAjax()
    {
        if (!window.jQuery || window.jQuery.__qaHooked) return false;
        var origAjax = window.jQuery.ajax;
        window.jQuery.ajax = function(url, options) {
            if (typeof url === 'object') {
                options = url;
            } else {
                options = options || {};
                options.url = url;
            }
            var origSuccess = options.success;
            options.success = function(data) {
                try { handleQuestion(data); } catch (e) { debug(e); }
                if (typeof origSuccess === 'function') {
                    return origSuccess.apply(this, arguments);
                }
            };
            return origAjax.call(this, options);
        };
        window.jQuery.__qaHooked = true;
        debug("已挂钩 jQuery.ajax");
        return true;
    }

    if (!hookAjax()) {
        var hookTimer = setInterval(function() {
            if (hookAjax()) clearInterval(hookTimer);
        }, 200);
        setTimeout(function() { clearInterval(hookTimer); }, 10000);
    }

    stopQATimeout();
})();
