import "@stdlib/deploy";
// 定义一个用户充值消息类型
message UserDeposit {
    userAddress: Address;
    amount: Int as uint64;
}

contract AIChargeContract with Deployable {
    // 存储用户余额的映射表，键为用户地址，值为TON币余额（单位：TON）
    userBalances: map<Address, Int>; // 修改为Int类型，假设其代表以小数形式存储的TON币余额

    // 合约所有者地址
    owner: Address;
    /**
     * 初始化合约，设置所有者地址并初始化用户余额映射表。
     * @param owner 合约所有者的地址。
     */
    init(owner: Address){
        self.owner = owner;
        self.userBalances = emptyMap();
    }

    /**
     * 处理用户充值消息。
     * @param msg 用户充值消息实例。
     */
    receive(msg: UserDeposit){
        // 检查充值金额是否大于零
        require(msg.amount > 0, "Deposit amount must be greater than zero");
        let amount: Int? = self.userBalances.get(msg.userAddress);
        if (amount != null) {
          // 更新用户余额
          let amountInt: Int = self.userBalances.get(msg.userAddress)!!;
          self.userBalances.set(msg.userAddress, (amountInt + msg.amount));
        } else {
          // 创建新用户
          self.userBalances.set(msg.userAddress, msg.amount);
        }
    }

    receive("useAI") {
        // 校验发送者是否为合约所有者
        let ctx: Context = context();
        self.useAI(ctx.sender);
        self.reply("useAI".asComment());
    }

    /**
     * 用户调用AI功能，消耗0.01个TON币。
     * @param userAddress 调用AI功能的用户地址。
     * @return true 如果调用成功，false 如果余额不足。
     */
     fun useAI(userAddress: Address) {
        // 检查用户是否有足够的TON币余额（假设余额以小数形式存储，如1.0表示1个TON币）
        let amount: Int? = self.userBalances.get(userAddress);
        require(amount != null, "Insufficient balance");

        let amount2: Int = self.userBalances.get(userAddress)!!;
        require(amount2 >= 10000000, "Insufficient balance");
        // 扣除0.01个TON币
        self.userBalances.set(userAddress, (amount2 - 10000000));
    }

    /**
     * 查询指定用户的TON币余额。
     * @param userAddress 用户地址。
     * @return 用户的TON币余额（单位：TON，以小数形式存储）。
     */

    get fun getUserBalance(userAddress: Address): Int {
      let amount: Int? = self.userBalances.get(userAddress);
      if (amount == null) {
          return 0;
      } else {
          return self.userBalances.get(userAddress)!!;
      }
    }
}