
const { readFileSync } = require('fs');
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { execSync } = require('child_process');

async function waitTime(max = 2000, min = 100) {
    const waitTime = Math.floor(Math.random() * (max - 100 + 1)) + min;
    return new Promise(resolve => setTimeout(() => {
        console.log('waiting...');
        resolve();
    }, waitTime));
} 


test('Test1', async () => {
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--disable-blink-features=AutomationControlled']
    });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        storageState: 'storageoverflow.json' // Load the saved storage state
    });

    await context.addCookies([COOKIES_ADD_HERE);

    // Add init script
    await context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})");

    // Open a new page
    const page = await context.newPage();


    const dragAndDropFile = async (
  page,
  selector,
  filePath,
  fileName,
  fileType
) => {
  const buffer = readFileSync(filePath).toString('base64');

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], localFileName, { type: localFileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    }
  );

  await page.dispatchEvent(selector, 'drop', { dataTransfer });
};

    //Set Env Variables
    //Set fileName according to env variable FILE_NAME
    const fileName = "video"
    //Set fileType according to env variable FILE_TYPE
    const fileType = '';
    //Set filePath from actual location in ./.n8n/tests folder
    const filePath = "../../video.mp4";

    //CHANGE THIS CODE BELOW !!!!!!!!!!!!!!!!!!!!!!
    const videoNumber = "490";
    const date = "2025-09-08";
    const d = date.split('-');
    const day = d[2];
    const m = d[1];
    const year = d[0];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[parseInt(m) - 1];
    const today = new Date();
    const todayMonth = today.getMonth() + 1; //January is 0
    const todayDay = String(today.getDate()).padStart(2, '0');
    const todayYear = today.getFullYear();

    //Check Date is valid: not in the past.
    if (year < todayYear || (year == todayYear && monthNames.indexOf(month) < todayMonth - 1) || (year == todayYear && monthNames.indexOf(month) == todayMonth - 1 && day < todayDay)) {
        throw new Error("Date is in the past. Please select a valid date.");
    }
    /*
    const args = process.argv[2];
    console.log("Args: ",args)
    let videoNumber = args;
    console.log("Video Number: ",videoNumber)
    //Set videoNumber and limitVideoNumber according to env variable VIDEO_NUMBER
    if (!args) {
        throw new Error("No VIDEO_NUMBER env variable found as input argument.");
    } */
    let limitVideoNumber = 500;
     if (parseInt(videoNumber) > 500 && parseInt(videoNumber) <= 1000){
        limitVideoNumber = 1000;
    } else if (parseInt(videoNumber) > 1000 && parseInt(videoNumber) <= 10000){
        limitVideoNumber = 10000;
    } else if(limitVideoNumber > 10000){
        throw new Error("VIDEO_NUMBER env variable must be below 10000 limit. It has surpassed last set limit of 10000.");
    }
    
    //Set other variables
    let text = `Bienvenido a Financeart! Top Secretos de Éxito, Riqueza y Sabiduría ${videoNumber}/${limitVideoNumber} 📊 ¿Te gustaría vivir de tus inversiones? 👉 Descubre en mi perfil el acceso al club de inversionistas privado. 🔗 Link en bio 🔒 5.0 ★. 🧠 Ideas reales, herramientas prácticas y hábitos para emprendedores 💡 Todo empieza con una decisión. ¿Estás listo? #emprendimiento #inversiones #libertadfinanciera #mentemillonaria #libertadfinanciera`
    let location = "Miami";
    let productName = 'Shaping Butt Lifter Bodysuit';

    // Got to Tiktok
    await page.goto('https://www.tiktok.com/');

    await waitTime();

    // Click Upload Button
    await page.getByRole('listitem', { name: 'Upload' }).click();

    await waitTime();

    // selector to upload video area
    let selector = "#root > div > div > div.css-fsbw52.ep9i2zp0 > div.css-86gjln.edss2sz5 > div > div.jsx-757547764.layout > div > div:nth-child(1) > div > div > input"
    // Upload Video File
    //await dragAndDropFile(page, selector, filePath, fileName, fileType);

    //Locate single file upload input element
    const uploadFile= page.locator(selector);

    //Select single file to upload using setInputFiles() method.
    await uploadFile.setInputFiles(filePath); 
    await waitTime();

    // If Message about Video Restriction Appears Click Turn on
    if(await page.getByRole('button', { name: 'Turn on' }).isVisible()){
        await page.getByRole('button', { name: 'Turn on' }).click();
    }
    await waitTime();

    // Remove text from Description. Clear means remove all text
    await page.getByText('video', { exact: true }).first().dblclick();
    await waitTime();
    await page.keyboard.press('Delete');
    await waitTime();
    // Add any sample char to enable span where to fill text next in Add Description to Video
    await page.keyboard.press('A');
    await waitTime();

    // Add Description to Video. Fullfill means replace all text
    await page.locator('.public-DraftStyleDefault-block > span > span').fill(text);

    await waitTime();
    // Set Location
    await page.getByRole('textbox', { name: 'Search locations' }).click();
    await waitTime();
    await page.getByRole('textbox', { name: 'Search locations' }).fill(location);
    await waitTime();
    await page.getByText(location, { exact: true }).first().click();

    // Set Product to sell
    await page.getByRole('button', { name: 'Add' }).click();
    await waitTime();
    await page.getByRole('combobox', { name: 'Link type' }).click();
    await waitTime();
    await page.getByRole('option', { name: 'Products' }).click();
    await waitTime();
    await page.getByRole('button', { name: 'Next' }).click();
    await waitTime();
    if(page.getByRole('cell', { name: productName }).isVisible()){
         await page.getByRole('cell', { name: productName }).getByLabel('').check();
    } else {
        throw new Error("Product Name not found. Please check the product name provided: " + productName);
    }
    await page.getByRole('cell', { name: productName }).getByLabel('').check();
    await waitTime();
    await page.getByRole('button', { name: 'Next' }).click();
    await waitTime();
    await page.getByRole('button', { name: 'Add' }).click();

    // Schedule Date and Time
    // Set Schedule option
    await page.locator('label').filter({ hasText: 'Schedule' }).locator('span').nth(1).click();
    await waitTime();
    // Set Time
    await page.getByRole('textbox').nth(1).click();
    await waitTime();
    // Select Hour
    const hour = page.locator("//span[contains(@class, 'tiktok-timepicker-left') and contains(text(), '15')]");
    await hour.click();
    await waitTime();
    // Select Minutes
    const minutes = page.locator("//span[contains(@class, 'tiktok-timepicker-right') and contains(text(), '30')]");
    await minutes.click();
    await waitTime();

    // Set Date
    // Click Date Textbox Calendar
    await page.getByRole('textbox').nth(2).click();
    // Set Date Selector
    const dateSelector = "//div[contains(@class, 'jsx-2483585186') and contains(@class, 'scheduled-picker')]//div[contains(@class, 'jsx-1793871833') and contains(@class, 'calendar-wrapper')]//div[7]//span[contains(text(), '4')]";    
    // If todayMonth is equal to month or todayMonth < toBe scheduled month and day toBe scheduled is visible)
    if(todayMonth == (parseInt(m)) || page.locator(dateSelector).isVisible()){ 
        // Click day to be scheduled
        await page.locator(dateSelector).click();

    }else { //else click to right
        await page.locator('.jsx-1793871833 > span:nth-child(3) > svg').click();
        // If day to be scheduled is visible after clicking right arrow
        if(page.locator(dateSelector).isVisible()){
            await page.locator(dateSelector).click();
        }else {
            throw new Error("Date to be scheduled is not visible. Please check the date provided. POSSIBLY IT SURPASSESS TIKTOK SCHEDULING LIMIT FROM TODAY");
        }
    }

    
    throw new Error("Stopping execution to avoid accidental upload. Remove this line to continue.");
    // Schedule Video
    await page.getByRole('button', { name: 'Schedule' }).click();

    // Save storage state to a file
    await context.storageState('storageoverflow.json');

    // Close the browser
    await browser.close();
});