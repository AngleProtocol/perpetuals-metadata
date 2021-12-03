import { ethers } from "ethers";
import generateSVG from "./svg-generator";
import {
  CONTRACTS_ADDRESSES,
  ALL_TOKENS,
  Interfaces,
} from "@angleprotocol/sdk";
import { PerpetualManagerFront } from "@angleprotocol/sdk/dist/constants/types";
import dayjs from "dayjs";
import express from "express";

// Fetch data from the blockchain to return the metadata json
async function generateJSON(
  perpetualID: number,
  collateralName: string,
  stableName: string
) {
  try {
    const contract = new ethers.Contract(
      CONTRACTS_ADDRESSES[1][stableName].collaterals![collateralName]
        ?.PerpetualManager as string,
      Interfaces.PerpetualManagerFront_Abi,
      new ethers.providers.InfuraProvider(
        undefined,
        "092a612c762245f0946ecb943377617d"
      )
    ) as PerpetualManagerFront;

    const perpetualData = await contract.perpetualData(perpetualID);
    if (perpetualData.entryRate.toString() === "0") {
      console.error("Undefined perpetual");
      return;
    }

    for (const token of Object.values(ALL_TOKENS[1][1])) {
      if (token.symbol === collateralName) {
        const collat = token;
        const date = dayjs
          .unix(perpetualData.entryTimestamp.toNumber())
          .format("DD/MM/YYYY HH:mm:ss");

        const svg = generateSVG(
          perpetualID,
          stableName,
          CONTRACTS_ADDRESSES[1][stableName].AgToken as string,
          collateralName,
          collat.address,
          date,
          perpetualData.entryRate
            .div(ethers.BigNumber.from(10).pow(12))
            .toNumber() / 1e6,
          perpetualData.margin
            .div(ethers.BigNumber.from(10).pow(collat.decimals - 4))
            .toNumber() / 1e4,
          perpetualData.margin
            .add(perpetualData.committedAmount)
            .mul(ethers.BigNumber.from(10).pow(6))
            .div(perpetualData.margin)
            .toNumber() / 1e6
        );

        const json = {
          name: `Angle Perpetual #${perpetualID} - ${collateralName}/${stableName.slice(
            2
          )}`,
          description:
            "This NFT represents the position of a Hedging Agent in Angle Protocol.\n\nDISCLAIMER: This NFT may be imitated, and the data displayed may not be up to date. This NFT should not be used as a truthful source of information.",
          image: `data:image/svg+xml;base64,${Buffer.from(svg).toString(
            "base64"
          )}`,
        };
        return json;
      }
    }

    console.error("Undefined collateral");
    return;
  } catch (error) {
    console.error(error);
  }
}

const app = express();

app.get("/*/*/*", async (req, res) => {
  try {
    const inputs = req.path.split("/");
    const collateralName = inputs[1];
    const stableName = inputs[2];
    const perpetualID = parseFloat(inputs[3]);
    res.json(await generateJSON(perpetualID, collateralName, stableName));
  } catch (error) {
    console.error(error);
    return;
  }
});

const server = app.listen(8080, () => {});
