import "@stdlib/deploy";

// 定义一个消息类型，用于add方法的参数
message Add {
    amount: Int as uint32; // 要增加的数值
}

// 定义一个智能合约，用于演示基本的合约操作
contract SampleTactContract with Deployable {

    owner: Address; // 合约所有者地址
    counter: Int as uint32; // 一个用于计数的变量

    /**
     * 合约初始化函数，设置初始所有者和计数器值。
     * @param owner 合约所有者的地址。
     */
    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
    }

    /**
     * 增加计数器的值。
     * @param v 要增加的值。
     * 要求调用者必须是合约所有者。
     */
    fun add(v: Int) {
        
        // 校验发送者是否为合约所有者
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // 更新计数器的值
        self.counter = (self.counter + v);
    }

    // 接收Add类型的消息，并调用add函数增加计数器
    receive(msg: Add) {
        self.add(msg.amount);
    }

    // 接收名为"increment"的消息，自动增加计数器，并回复一个注释消息
    receive("increment") {
        self.add(1);
        self.reply("incremented".asComment());
    }

    /**
     * 获取计数器的当前值。
     * @return 计数器的当前值。
     */
    get fun counter(): Int {
        return self.counter;
    }
}

/**
这个tact代码定义了一个名为SampleTactContract的智能合约，具有以下功能：

消息类型 Add：定义一个名为Add的消息结构，包含一个amount字段，表示要增加的整数值（类型为Int，限制为uint32）。

合约声明 SampleTactContract：声明一个智能合约，继承自Deployable，表示该合约可部署。合约内部有两个状态变量：

owner：存储合约的所有者地址。
counter：用于计数的整数变量，类型为Int，限制为uint32。
初始化函数 init：

输入参数：owner（Address类型），即合约所有者的地址。
功能：在合约创建时设置其所有者为传入的owner地址，并将计数器counter初始化为0。
函数 add：

输入参数：v（Int类型），表示要增加到计数器上的数值。
功能：检查调用者是否为合约所有者，若不是则抛出异常（require(ctx.sender == self.owner, "Invalid sender");）。通过检查context().sender来获取调用者地址。如果调用者有效，将v值累加到counter上。
消息接收器 receive：

第一个接收器：接收类型为Add的消息。当接收到此类消息时，调用add函数，将消息中的amount字段值累加到计数器上。
第二个接收器：接收名为"increment"的消息。接收到此消息时，自动将计数器值增加1，并通过self.reply("incremented".asComment());回复一个注释消息（可能用于通知或日志记录）。
getter 函数 counter：

无输入参数。
功能：返回当前计数器counter的值。
总结来说，SampleTactContract是一个具备计数功能的智能合约，允许所有者通过直接调用add函数、发送Add类型消息或发送名为"increment"的消息来增加计数器值。同时，提供了一个getter方法供外部查询当前计数器的值。合约通过权限控制确保只有所有者能修改计数器。
 */
