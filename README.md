## Welcome to Dapp Canvas

For our hackathon project, we created a custom UI builder meant to support an underlying smart contract defined by a user. The idea is to allow users to input any smart contract address who’s ABI will be fetched from an applicable block explorer, and then widgets can be created and moved around the live editor and can hook into the underlying smart contract. Users can customize which widgets they’d like to use and which widget will correspond to which function within the smart contract. The user can also add widgets that do not interact with the smart contract for customization purposes. These widgets include, text boxes, shapes, images and gifs. After a user finishes customizing their UI, they have the option to publish it. Publishing it will generate a link & will store the metadata for all canvas widgets on Filecoin. <br>
<br>
One benefit to Dapp Canvas is that smart contract developers will be able to create light weight UIs to interact with their smart contracts deployed to testnets. This would give them an alternative to creating numerous scripts, or having to reshuffle an existing complex UI if they already had one established. An additional use case would be creating UIs on top of protocols that offer fee generation specifically for building UIs on top of said protocol. This would give users a simple no code solution to get started.<br>
<br>

**Imagination is the only limitation**

# Tech Stack
- Filecoin: Used to store user created widget metadata. Once the site is published, widget data is fetched from Filecoin and used to build the widgets clientside.
- Next.JS: Used as a frontend framework.
- TailwindCSS: Used as a styling framework.
- EtherJS: Used for contract interaction.
- Arbiscan: Used to fetch ABI data for on-chain contracts.
