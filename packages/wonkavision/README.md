# wonkavision

![tophat](https://user-images.githubusercontent.com/325813/91506198-c8cb7b00-e88e-11ea-9215-bad08585248a.png)

## Getting Started

1. `npm install wonkavision`
1. Create `.env` file in the root of your project and populate with these values:

    ```text
    SSH_HOST=...
    SSH_USERNAME=...
    SSH_PASSWORD=...
    ```

1. Add a new npm script to your `package.json` file:

    ```json
    "scripts": {
      "deploy": "npm run build && wonkavision clean && wonkavision zip && wonkavision ship ./deploy/deploy.zip wwwroot/app && wonkavision unzip wwwroot/app"
    }
    ```
