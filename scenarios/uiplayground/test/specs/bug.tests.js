const AjaxPage = require('../pageobjects/ajaxData.page');
const VisibilityPage = require('../pageobjects/visibility.page');
const ShadowDomPage = require("../pageobjects/shadowDom.page");
const ClickPage = require('../pageobjects/click.page');

describe('Ajax Test', () => {
    it('should have a success message only after trigger the button more that once', async () => {
        await AjaxPage.open();
        await AjaxPage.clickOnAjaxTriggerButton();
        await AjaxPage.waitToJavaScriptProcessingFinished();
        await expect(AjaxPage.successMessage)
            .toHaveTextContaining('Data loaded with AJAX get request.');
        await AjaxPage.clickOnAjaxTriggerButton();
        await AjaxPage.waitToJavaScriptProcessingFinished();
        await expect(AjaxPage.successMessageList)
            .toBeElementsArrayOfSize(1)
    });
});

describe('Visibility Test', () => {
    it('should have the unhide button after click the hide button', async () => {
        await VisibilityPage.open();
        await expect(VisibilityPage.hideButton).toBeExisting();
        await VisibilityPage.clickOnHideButton();
        await expect(VisibilityPage.unHideButton).toBeExisting();
        await expect(VisibilityPage.hideButton).not.toBeExisting();
    });
});

describe('Shadow DOM Test', () => {
    it('should copy the GUID on the clipboard', async () => {
        await ShadowDomPage.open();
        await ShadowDomPage.clickOnGenerateButton();
        const currentGuid = await ShadowDomPage.getCurrentGuidValue();
        await ShadowDomPage.clickOnCopyButton();
        const clipboardGuid = await ShadowDomPage.getClipboardGuidValue();
        await expect(currentGuid).toEqual(clipboardGuid);
    });
});

describe('Click Test', () => {
    it('should be able to click and not generate a event', async () => {
        await ClickPage.open();
        await ClickPage.clickOnClickEventButton();
        await expect(ClickPage.clickEventButton).not
            .toHaveAttributeContaining('class', 'btn btn-primary');
    });
});