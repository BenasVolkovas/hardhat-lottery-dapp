import {ethers, network} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {networkConfig, developmentChains} from "../helper-hardhat-config"
import {VRFCoordinatorV2Mock} from "../typechain-types"

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9

const main = async (): Promise<string> => {
    const accounts: SignerWithAddress[] = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! Deploying mocks...")

        const vrfMockFactory = await ethers.getContractFactory(
            "VRFCoordinatorV2Mock",
            deployer
        )

        const vrfMock = await vrfMockFactory.deploy(BASE_FEE, GAS_PRICE_LINK)
        await vrfMock.deployed()

        console.log("Mocks deployed!")
        console.log("--------------------------------------------------")
        return vrfMock.address
    }
    return ""
}

export const deployMocks = async (): Promise<string> => {
    return await main()
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
