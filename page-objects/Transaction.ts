import { Page } from 'playwright';

export class Transactions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    readonly listGroup = 'div.list-group';
    readonly yourBalance = 'p';
    readonly navBar = 'nav';
    readonly Table = 'table';
    readonly pageNumber = 'div.row';
    readonly footerSelector = 'footer';
    async listExists() {
        return (await this.page.$(this.listGroup)) !== null;
    }
    async yourBalanceExists() {
        return (await this.page.$(this.yourBalance)) !== null;
    }
    async navBarExists() {
        return (await this.page.$(this.navBar)) !== null;
    }
    async TableExists() {
        return (await this.page.$(this.Table)) !== null;
    }
    async footerExists() {
        return (await this.page.$(this.footerSelector)) !== null;
    }
    async pageNumberExists() {
        return (await this.page.$(this.pageNumber)) !== null;
    }
}
