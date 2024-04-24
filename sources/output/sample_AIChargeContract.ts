import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type UserDeposit = {
    $$type: 'UserDeposit';
    userAddress: Address;
    amount: bigint;
}

export function storeUserDeposit(src: UserDeposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3303941106, 32);
        b_0.storeAddress(src.userAddress);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadUserDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3303941106) { throw Error('Invalid prefix'); }
    let _userAddress = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    return { $$type: 'UserDeposit' as const, userAddress: _userAddress, amount: _amount };
}

function loadTupleUserDeposit(source: TupleReader) {
    let _userAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'UserDeposit' as const, userAddress: _userAddress, amount: _amount };
}

function storeTupleUserDeposit(source: UserDeposit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.userAddress);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserUserDeposit(): DictionaryValue<UserDeposit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUserDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadUserDeposit(src.loadRef().beginParse());
        }
    }
}

 type AIChargeContract_init_args = {
    $$type: 'AIChargeContract_init_args';
    owner: Address;
}

function initAIChargeContract_init_args(src: AIChargeContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function AIChargeContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFwEABJcAART/APSkE/S88sgLAQIBYgIDAtbQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAvQAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBQEAgFYDg8D0O2i7fsBkjB/4HAh10nCH5UwINcLH94gghDE7iPyuo62MNMfAYIQxO4j8rry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/WWwS2zx/4CCCEJRqmLa64wLAAJEw4w1wBQYHAfaCAONuIcIA8vQjgQELI4EBAUEz9ApvoZQB1wAwkltt4m6zjjkjgQELI4EBAUEz9ApvoZQB1wAwkltt4iBu8tCAgQELAqAQNBKBAQEhbpVbWfRZMJjIAc8AQTP0QeKOGxAjgQELWYEBASFulVtZ9FkwmMgBzwBBM/RB4uIIAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CwN6+QGC8IugxsgIWr6U06jhW4esaWZ7p0Hh+r7VoBtqwwB67cBvuo+V+EFvJBAjXwPbPIj4QgF/bds8f9sx4AkKCwACAQDYIoEBCyKBAQFBM/QKb6GUAdcAMJJbbeKCANVXAW6z8vQigQELIoEBAUEz9ApvoZQB1wAwkltt4iBu8tCAggDVVyGCCJiWgL7y9IEBCwGCCJiWgKEQNBKBAQEhbpVbWfRZMJjIAc8AQTP0QeIBABIAAAAAdXNlQUkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAJW7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgCAUgQEQIBSBITAHWybuNDVpcGZzOi8vUW1YZmczSnpvTVlnQ0FqZnRtZllkVlRpODFWTmk3eEQ2QndYTG5ob1pwTkNtbYIAAQqr7tRNDSAAECSqq5INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8WNs8bCEUFQG+7UTQ1AH4Y9IAAY4k9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwWAHAigQELIoEBAUEz9ApvoZQB1wAwkltt4m6SMHDggQELIwKBAQFBM/QKb6GUAdcAMJJbbeIgbvLQgAAEbQE=');
    const __system = Cell.fromBase64('te6cckECGQEABKEAAQHAAQEFoANnAgEU/wD0pBP0vPLICwMCAWIMBAIBWAsFAgFIBwYAdbJu40NWlwZnM6Ly9RbVhmZzNKem9NWWdDQWpmdG1mWWRWVGk4MVZOaTd4RDZCd1hMbmhvWnBOQ21tggAgFICggCSqq5INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8WNs8bCEXCQBwIoEBCyKBAQFBM/QKb6GUAdcAMJJbbeJukjBw4IEBCyMCgQEBQTP0Cm+hlAHXADCSW23iIG7y0IAAEKq+7UTQ0gABAJW7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgC1tAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFrbPPLggsj4QwHMfwHKAFkC9AABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UFw0D0O2i7fsBkjB/4HAh10nCH5UwINcLH94gghDE7iPyuo62MNMfAYIQxO4j8rry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/WWwS2zx/4CCCEJRqmLa64wLAAJEw4w1wFREOA3r5AYLwi6DGyAhavpTTqOFbh6xpZnunQeH6vtWgG2rDAHrtwG+6j5X4QW8kECNfA9s8iPhCAX9t2zx/2zHgEA8SABIAAAAAdXNlQUkA2CKBAQsigQEBQTP0Cm+hlAHXADCSW23iggDVVwFus/L0IoEBCyKBAQFBM/QKb6GUAdcAMJJbbeIgbvLQgIIA1VchggiYloC+8vSBAQsBggiYloChEDQSgQEBIW6VW1n0WTCYyAHPAEEz9EHiAQFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fxIBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8EwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAUAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAfaCAONuIcIA8vQjgQELI4EBAUEz9ApvoZQB1wAwkltt4m6zjjkjgQELI4EBAUEz9ApvoZQB1wAwkltt4iBu8tCAgQELAqAQNBKBAQEhbpVbWfRZMJjIAc8AQTP0QeKOGxAjgQELWYEBASFulVtZ9FkwmMgBzwBBM/RB4uIWAAIBAb7tRNDUAfhj0gABjiT0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdHbPBgABG0BiBF6tw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAIChargeContract_init_args({ $$type: 'AIChargeContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const AIChargeContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    54615: { message: `Insufficient balance` },
    58222: { message: `Deposit amount must be greater than zero` },
}

const AIChargeContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserDeposit","header":3303941106,"fields":[{"name":"userAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const AIChargeContract_getters: ABIGetter[] = [
    {"name":"getUserBalance","arguments":[{"name":"userAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const AIChargeContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UserDeposit"}},
    {"receiver":"internal","message":{"kind":"text","text":"useAI"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class AIChargeContract implements Contract {
    
    static async init(owner: Address) {
        return await AIChargeContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await AIChargeContract_init(owner);
        const address = contractAddress(0, init);
        return new AIChargeContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new AIChargeContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AIChargeContract_types,
        getters: AIChargeContract_getters,
        receivers: AIChargeContract_receivers,
        errors: AIChargeContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UserDeposit | 'useAI' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UserDeposit') {
            body = beginCell().store(storeUserDeposit(message)).endCell();
        }
        if (message === 'useAI') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetUserBalance(provider: ContractProvider, userAddress: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(userAddress);
        let source = (await provider.get('getUserBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}