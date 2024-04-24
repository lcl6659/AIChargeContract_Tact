import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { AIChargeContract } from "./output/sample_AIChargeContract";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await AIChargeContract.fromInit(owner.address));
        system.name(contract.address, "main");
        // let track = system.track(contract);
        console.log("contract.address", contract.address)
        console.log("user.address", owner.address)

        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();

        // Check Balance
        const b1 = await contract.getGetUserBalance(owner.address)
        console.log("Check Balance_1", b1)
        // expect(await contract.getGetUserBalance(owner.address)).toEqual(0n);

        // Increment counter
        await contract.send(owner, { value: toNano(1) }, { $$type: "UserDeposit", userAddress: owner.address, amount: toNano(1) });
        await system.run();

        // Check Balance
        const b2 = await contract.getGetUserBalance(owner.address)
        console.log("Check Balance_2", b2)
        // expect(await contract.getGetUserBalance(owner.address)).toEqual(1n);

        // useAI
        await contract.send(owner, { value: toNano(1) }, "useAI");
        await system.run();

        /// Check Balance
        const b3 = await contract.getGetUserBalance(owner.address)
        console.log("Check Balance_3", b3)
        // expect(await contract.getGetUserBalance(owner.address)).toEqual(1n);
    });
});
