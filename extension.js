/*	Déjà Dup backup button
	GNOME Shell extension
	(c) Francois Thirioux 2021
	License: GPLv3 */
	

const { GObject, St } = imports.gi;
const Main = imports.ui.main;
const Util = imports.misc.util;
const PanelMenu = imports.ui.panelMenu;


var BackupIndicator = GObject.registerClass(
class BackupIndicator extends PanelMenu.Button {
	_init() {
		super._init(0.0, 'DejaDup Backup Button');
		
		// create icon
        this.hbox = new St.BoxLayout({visible: true, reactive: true, can_focus: true, track_hover: true}); 
		this.icon = new St.Icon({icon_name: 'emblem-synchronizing-symbolic', style_class: 'system-status-icon'});
		// if Yaru icon theme is installed, you can use:
		// this.icon = new St.Icon({ icon_name: 'org.gnome.DejaDup-symbolic', style_class: 'system-status-icon' });
        this.hbox.add_child(this.icon);
        this.add_child(this.hbox);
        
        // connect signal
        this.click = this.connect('button-press-event', this._runBackup.bind(this));
	}
	
	_runBackup() {
		try {
			Util.trySpawnCommandLine("deja-dup --backup");
		} catch(err) {
			Main.notify("Error: unable to run backup");
		}
	}
	
	_destroy() {
		this.disconnect(this.click);
		super.destroy();
	}
})

class Extension {
    constructor() {
    }

    enable() {
		this._indicator = new BackupIndicator();
		Main.panel.addToStatusArea('dejadup-backup-indicator', this._indicator);
    }

    disable() {
    	this._indicator._destroy();
    }
}

function init() {
	return new Extension();
}
