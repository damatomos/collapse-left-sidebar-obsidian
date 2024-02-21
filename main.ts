import { Plugin, Notice } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<MyPluginSettings> = {
	dateFormat: "YYYY-MM-DD",
};

export default class HelloWorldPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.app.workspace.onLayoutReady(() => {
			this.addCollapse();

			this.addCommand({
				id: "enable-collapse",
				name: "Enable",
				callback: () => this.addCollapse()
			});

			this.addCommand({
				id: 'disable-collapse',
				name: 'Disable',
				callback: () => this.removeCollapse()
			})
		});
	}

	removeCollapse()
	{
		const divisor = this.app.workspace.containerEl.querySelector('.divisor');
		if (divisor) {
			const { containerEl } = this.app.workspace.leftRibbon as { containerEl: HTMLElement };
			if (containerEl.style.display == 'none')
			{
				containerEl.style.display = 'flex'
				
				if (this.app.workspace.leftSplit.collapsed)
				{
					this.app.workspace.leftSplit.expand();
				} 
			}
			
			this.app.workspace.containerEl.removeChild(divisor);
		}
	}

	addCollapse()
	{
		this.removeCollapse();
		new Notice("Collapse Left Was Added!")
		let divisor = this.app.workspace.containerEl.querySelector('.divisor');
		if (!divisor)
		{
			divisor = createEl('div');
			console.log(divisor)
		}
		divisor.classList.add('divisor');
		this.app.workspace.containerEl.insertBefore(divisor, this.app.workspace.containerEl.firstChild);
		console.log('insert')

		divisor.addEventListener('click', () => {
			const { containerEl } = this.app.workspace.leftRibbon as { containerEl: HTMLElement };
			if (containerEl.style.display == 'none')
			{
				containerEl.style.display = 'flex'
				
				if (this.app.workspace.leftSplit.collapsed)
				{
					this.app.workspace.leftSplit.expand();
				} 
			} else
			{
				containerEl.style.display = 'none';
				if (!this.app.workspace.leftSplit.collapsed)
				{
					this.app.workspace.leftSplit.collapse();
				}
			}
		})
	}

	async onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
