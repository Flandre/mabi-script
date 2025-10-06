// ==UserScript==
// @name         洛奇猜灯谜20250925
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  洛奇答题自动化脚本
// @author       flandre
// @match        https://evt08.tiancity.com/luoqi/2551981/home/index.php
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let isdebug = true; // 调试日志用
let debug = isdebug ? console.log.bind(console) : ()=>{}
(function() {
    'use strict';
    var qa =
        [
            {title:"编年史任务中是谁与谁的战役？",option:"a"},
            {title:"一天过去，脱件衣裳，一年过去，全身脱光。提示:物品",option:"a"},
            {title:"小华的妈妈有三个孩子：大毛、二毛，第三个孩子叫什么？",option:"c"},
            {title:"圣诞夜，圣诞老公公放进袜子的第一件东西是什么?",option:"a"},
            {title:"什么东西不会说话却能回答你？",option:"a"},
            {title:"布里列赫地下城第二阶段的BOSS叫什么名字？",option:"b"},
            {title:"布里列赫地下城掉落的材料可以制作成什么武器？",option:"b"},
            {title:"布里列赫地下城第三阶段的BOSS叫什么名字？",option:"c"},
            {title:"蕾拉穿着什么颜色的裙子",option:"b"},
            {title:"哪种“钥匙”打不开门？",option:"b"},
            {title:"小白鸡，托长尾，走一步，啄一嘴提示:物品",option:"c"},
            {title:"保维德生活在哪个城市。",option:"c"},
            {title:"铜矿石最多可以堆叠几个。",option:"c"},
            {title:"众神离去的城市穆利阿斯，被灵魂们占据并扎根的城市叫什么？",option:"a"},
            {title:"迪尔科内尔的治疗所里有几张床。",option:"b"},
            {title:"一物真是妙，谁见都要笑，胖子变瘦子，高个变矮子。(打一科学产物)",option:"a"},
            {title:"打什么东西，不必花力气？",option:"a"},
            {title:"克鲁格的肩膀上有一只？",option:"b"},
            {title:"状如半个球,伴人来吃饭,颜色白如雪,一日洗三遍。(打一生活物)",option:"a"},
            {title:"老有牙，小有牙,不老不小没有牙。(打一自然物)",option:"c"},
            {title:"魔法的才能基础上结合链刃才能所施展出的才能是谁？",option:"a"},
            {title:"什么人最喜欢日光浴?",option:"b"},
            {title:"敦巴伦学校内的图书馆有几个水晶珠子。",option:"c"},
            {title:"你知道上课睡觉有什么不好吗？",option:"b"},
            {title:"兄弟两人同走路，摆一摆来走一走，常年劳累不停歇，走来走去未出户提示:用具",option:"a"},
            {title:"武器大师活动中福格斯赠送的是什么武器？",option:"b"},
            {title:"一条怪牛，两条圆腿，骑他肚上，抓他双角。提示:交通工具",option:"c"},
            {title:"迪尔科内尔的村长的家里养了一只什么动物？",option:"a"},
            {title:"说鸟不是鸟，字里有个鸟。会画竹叶子，爱吃小虫子。(打一动物)",option:"a"},
            {title:"敦巴伦的伊文前面有几个组队公告板",option:"a"},
            {title:"艾明马恰的酒店的大门前有4份张贴的小广告。",answer:"4根"},
            {title:"埃文中有几个小型喷水池。",answer:"9个"},
            {title:"整个班格有几个炉子。",answer:"9个"},
            {title:"埃文中有几个小型喷水池。",answer:"9个"},
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
            {title:"G27寂静庭院在什么时候上线的?",answer:"8月6日"},
            {title:"弓术的才能基础上结合战斗炼金术才能所施展出的才能是谁？",answer:"罗希内"},
            {title:"进入布里列赫地下城需要通过第几个主线任务?",answer:"G27"},
            {title:"近战才能的基础上结合魔法才能所施展出的阿尔卡纳才能是谁？",answer:"科雯娜"},
            {title:"近战的才能基础上结合祝福才能所施展出的才能是谁？",answer:"伊奥拉"},
            {title:"精灵形象变换栏最多可扩展至多少个？",answer:"20个"},
            {title:"可收纳500个花束的结实的花篮，可以在哪里购买？",answer:"贸易商人努努"},
            {title:"罗希内的日常工作什么？",answer:"看山人"},
            {title:"目前移动速度最快的宠物是什么？",answer:"茉茉"},
            {title:"牧师才能的基础上结合吟游诗人才能所施展出的才能是谁？",answer:"奥哈德"},
            {title:"魔法的才能基础上结合链刃才能所施展出的才能是谁？",answer:"萝温"},
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
            {title:"打什么东西，不必花力气？",answer:"打瞌睡"},
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
            {title:"兄弟两人同走路，摆一摆来走一走，常年劳累不停歇，走来走去未出户提示:用具",answer:"钟"},
            {title:"兄弟四五人，各进一道门，要是进错了，定会笑死人提示:物品",answer:"纽扣"},
            {title:"象棉不是棉，名字蛮新鲜，石油提练出，抽丝在车间提示:化学制品",answer:"化学纤维"},
            {title:"一物真是妙，谁见都要笑，胖子变瘦子，高个变矮子。(打一科学产物)",answer:"哈哈镜"},
            {title:"一条带儿细又长，开动机器它又忙，你作报告它记录，一字一句不走样提示:电讯用具",answer:"录音机"},
            {title:"一个小黑孩，自小口不开，偶然一开口，跌出舌头来。(打一常用物品)",answer:"牙膏"},
            {title:"一位卡车司机撞倒一个骑摩托车的人，卡车司机受重伤，摩托车骑士却没事，为什么？",answer:"卡车司机当时没开车"},
            {title:"一间房子里，坐满小兄弟，摸同哪一个，都会生火气。(打一物品) ",answer:"火柴"},
            {title:"一字有六笔,笔笔是斜的,你要不知道,大家告诉你。(打一字)",answer:"众"},
            {title:"一双玉燕靠地飞，早上出门晚上归。提示:物品",answer:"鞋子"},
            {title:"一天过去，脱件衣裳，一年过去，全身脱光。提示:物品",answer:"挂历"},
            {title:"一年四季都盛开的花是什么花？",answer:"月季"},
            {title:"怎么使麻雀安静下来?",answer:"压它-下"},
            {title:"左手五个，右手五个。拿去十个，还剩十个。(打一日常用品)",answer:"手套"},
            {title:"两人很亲密,彼此不分离，它们一团聚,东西就分离。(打一工具)",answer:"剪子"},
            {title:"状如半个球,伴人来吃饭,颜色白如雪,一日洗三遍。(打一生活物)",answer:"碗"},
            {title:"有一位年轻人流了400毫升的血,脸上却微笑着,一点事都没有,而且感觉很高兴?",answer:"无偿献血"},
            {title:"小兵一尺高，军装光闪耀，每当要冲锋，喊杀他最早提示:军用物",answer:"军号"},
            {title:"小白鸡，托长尾，走一步，啄一嘴提示:物品",answer:"针"},
            {title:"敦巴伦学校内的图书馆有几个水晶珠子。",answer:"4个"},
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
            {title:"圣诞夜，圣诞老公公放进袜子的第一件东西是什么?",answer:"脚"},
            {title:"什么样钉子最可怕?",answer:"眼中钉"},
            {title:"小小孩儿真漂亮，五颜六色身细长，山水花鸟它能绘，表里如一有文章提示:文具",answer:"蜡笔"},
            {title:"早晨醒来，每个人都要做的第一件事是什么？",answer:"睁开眼睛"},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
            {title:"",answer:""},
        ];
    // 关闭答题超时机制
    function stopQATimeout()
    {
        // 清除倒计时定时器（页面使用 timer 变量）
        try {
            // 方法1: 直接清除页面的 timer
            if (window.timer !== undefined) {
                clearInterval(window.timer);
                window.timer = null;
                debug("已停止倒计时定时器");
            }
            // 方法2: 重写 CountDown 函数，防止定时器执行
            if (typeof window.CountDown === 'function') {
                window.CountDown = function() {
                    // 空函数，阻止倒计时
                };
            }
            // 方法3: 修改 maxtime 变量，停止倒计时逻辑
            if (window.maxtime !== undefined) {
                window.maxtime = 99999;
            }
        } catch(e) {
            debug("停止定时器失败:", e);
        }
    }
    // 拦截 XMLHttpRequest
    var oldxhr = window.XMLHttpRequest;
    function newobj(){};
    window.XMLHttpRequest = function(){
        let tagetobk = new newobj();
        tagetobk.oldxhr=new oldxhr();
        let handle={
            get: function(target, prop, receiver) {
                if(prop === 'oldxhr'){
                    return Reflect.get(target, prop);
                }
                if(typeof Reflect.get(target.oldxhr, prop) === 'function')
                {
                    if(Reflect.get(target.oldxhr, prop+'proxy') === undefined)
                    {
                        target.oldxhr[prop+'proxy'] = (...funcargs)=> {
                            let result = target.oldxhr[prop].call(target.oldxhr, ...funcargs);
                            //debug('函数劫持获取结果',result);
                            return result;
                        }
                    }
                    return Reflect.get(target.oldxhr, prop+'proxy');
                }
                if(prop.indexOf('response') !== -1)
                {
                    var msg = Reflect.get(target.oldxhr, prop);
                    if(msg !== null)
                    {
                        //debug('属性劫持结果', msg);
                        doMsg(msg);
                    }
                    return Reflect.get(target.oldxhr, prop);
                }
                return Reflect.get(target.oldxhr, prop);
            },
            set(target, prop, value) {
                return Reflect.set(target.oldxhr, prop, value);
            },
            has(target, key) {
                return Reflect.has(target.oldxhr,key);
            }
        }
        let ret = new Proxy(tagetobk, handle);
        return ret;
    }
    // 清理文本：去除所有标点、括号、空格并trim
    function cleanText(text)
    {
        if (!text) return '';
        // 去除所有非中文、英文、数字的字符，并转小写
        return text.replace(/[\s\.,;:!?！？。，、；：""''「」『』（）\(\)\[\]【】《》<>…—\-]/g, '').trim().toLowerCase();
    }

    // 智能等待新题目加载完成
    function waitForNewQuestion(answer) {
        var checkCount = 0;
        var maxChecks = 50; // 最多检查5秒

        function checkQuestion() {
            checkCount++;

            // 检查是否还有correct标记（说明还在显示上一题答案）
            var hasCorrect = $(".qA .option a.correct").length > 0;

            if (!hasCorrect && checkCount > 5) {
                // 没有correct标记且已经检查了几次，说明新题目已经加载
                debug("新题目已加载，开始标记答案");
                setTimeout(function(){doCorrect(answer)}, 500);
                return;
            }

            if (checkCount >= maxChecks) {
                // 超时，直接标记答案
                debug("等待超时，直接标记答案");
                doCorrect(answer);
                return;
            }

            // 继续检查
            setTimeout(checkQuestion, 100);
        }

        // 开始检查
        setTimeout(checkQuestion, 100);
    }
    function doCorrect(opt)
    {
        // 支持两种类型：option (a/b/c/d) 或 answer (文本内容)
        var isTextAnswer = (opt != 'a' && opt != 'b' && opt != 'c' && opt != 'd');
        if (isTextAnswer) {
            // answer 模式：在选项中查找匹配的文本
            var cleanAnswer = cleanText(opt);
            var $allOptions = $(".qA .option a");
            var found = false;
            $allOptions.each(function(index, element) {
                var optionFullText = $(element).text();
                var optionText = optionFullText.substring(2); // 去掉 "A）" 前缀
                var cleanOption = cleanText(optionText);
                debug("选项全文：" + optionFullText + " 去掉前缀后：" + optionText + " 清理后：" + cleanOption + " 答案清理后：" + cleanAnswer);
                if (cleanOption.indexOf(cleanAnswer) !== -1 || cleanAnswer.indexOf(cleanOption) !== -1) {
                    $(element).addClass('correct');
                    var optionLetter = optionFullText.charAt(0);
                    console.log("%c正确答案：" + optionLetter + "）" + optionText, "color: #00ff00; font-size: 20px; font-weight: bold;");
                    // 在页面上显示提示
                    if ($('#auto-answer-tip').length === 0) {
                        $('body').append('<div id="auto-answer-tip" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: #00ff00; padding: 20px 40px; font-size: 24px; font-weight: bold; z-index: 99999; border-radius: 10px; box-shadow: 0 0 20px rgba(0,255,0,0.5);"></div>');
                    }
                    $('#auto-answer-tip').html('正确答案：选项 ' + optionLetter).fadeIn(300);
                    setTimeout(function() {
                        $('#auto-answer-tip').fadeOut(300);
                    }, 3000);
                    found = true;
                    return false; // 跳出 each 循环
                }
            });
            if (!found) {
                console.log("%c未找到匹配的答案：" + opt, "color: #ff9900; font-size: 16px; font-weight: bold;");
            }
        } else {
            // option 模式：a/b/c/d
            var dataValue = '';
            var optionText = '';
            if (opt == 'a') {
                dataValue = '1';
                optionText = 'A';
            } else if (opt == 'b') {
                dataValue = '2';
                optionText = 'B';
            } else if (opt == 'c') {
                dataValue = '3';
                optionText = 'C';
            } else if (opt == 'd') {
                dataValue = '4';
                optionText = 'D';
            }
            if (dataValue) {
                // 找到正确答案的选项并添加 correct 样式
                var $correctOption = $(".qA .option a[data='" + dataValue + "']");
                if ($correctOption.length > 0) {
                    $correctOption.addClass('correct');
                    // 在控制台显示提示
                    console.log("%c正确答案：" + optionText + "）" + $correctOption.text().substring(2), "color: #00ff00; font-size: 20px; font-weight: bold;");
                } else {
                    // 兼容旧格式（使用索引）
                    var index = parseInt(dataValue) - 1;
                    $(".qA .option a:eq(" + index + ")").addClass('correct');
                    console.log("%c正确答案：" + optionText, "color: #00ff00; font-size: 20px; font-weight: bold;");
                }
                // 在页面上显示提示（如果没有提示框就创建一个）
                if ($('#auto-answer-tip').length === 0) {
                    $('body').append('<div id="auto-answer-tip" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: #00ff00; padding: 20px 40px; font-size: 24px; font-weight: bold; z-index: 99999; border-radius: 10px; box-shadow: 0 0 20px rgba(0,255,0,0.5);"></div>');
                }
                $('#auto-answer-tip').html('正确答案：选项 ' + optionText).fadeIn(300);
                // 3秒后淡出提示
                setTimeout(function() {
                    $('#auto-answer-tip').fadeOut(300);
                }, 3000);
            }
        }
    }
    function doMsg(msg)
    {
        var obj = JSON.parse(msg);
        if(obj.irv !== 200) return;
        // 检测到题目信息（从 subject 接口返回）
        if(obj.subject !== undefined)
        {
            var title = obj.subject;
            var fg = true;
            // 立即停止倒计时定时器
            stopQATimeout();
            // 清理题目文本（去除所有标点、空格等）
            var cleanTitle = cleanText(title);
            // 在题库中查找匹配的题目
            for(var i = 0, len = qa.length; i < len; i++)
            {
                var cleanQaTitle = cleanText(qa[i].title);
                // 优先精确匹配
                if(cleanTitle === cleanQaTitle)
                {
                    // 支持 option 和 answer 两种字段
                    var answer = qa[i].option || qa[i].answer;
                    debug("找到题目精确匹配：" + title + " 答案：" + answer);
                    // 等待页面完全更新新题目后再标记答案
                    (function(ans) {
                        waitForNewQuestion(ans);
                    })(answer);
                    fg = false;
                    break;
                }
            }
            // 如果精确匹配失败，尝试包含匹配（但要求匹配度较高）
            if(fg)
            {
                for(var j = 0, len2 = qa.length; j < len2; j++)
                {
                    var cleanQaTitle2 = cleanText(qa[j].title);
                    // 只有当题目包含关系且长度足够时才匹配
                    if(cleanTitle.length > 5 && cleanQaTitle2.length > 5)
                    {
                        if(cleanTitle.indexOf(cleanQaTitle2) !== -1 || cleanQaTitle2.indexOf(cleanTitle) !== -1)
                        {
                            // 支持 option 和 answer 两种字段
                            var answer2 = qa[j].option || qa[j].answer;
                            debug("找到题目模糊匹配：" + title + " 答案：" + answer2);
                            (function(ans) {
                                waitForNewQuestion(ans);
                            })(answer2);
                            fg = false;
                            break;
                        }
                    }
                }
            }
            if(fg)
            {
                debug("未找到题目：\"" + title + "\"");
                console.log("%c题库中未找到此题目！", "color: #ff0000; font-size: 16px; font-weight: bold;");
            }
        }
    }
})();
