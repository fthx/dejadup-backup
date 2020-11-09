/*	Déjà Dup backup button
	GNOME Shell extension
	(c) Francois Thirioux 2020
	License: GPLv3 */
	

const { Clutter, GLib, GObject, Shell, St } = imports.gi;
const Main = imports.ui.main;
const Util = imports.misc.util;
const PanelMenu = imports.ui.panelMenu;
const Lang = imports.lang;


var BackupIndicator = GObject.registerClass(
class BackupIndicator extends PanelMenu.Button {
	_init() {
		super._init(0.0, 'DejaDup Backup Button');
		
		// create icon
        this.hbox = new St.BoxLayout({style_class: 'panel-button', visible: true, reactive: true, can_focus: true, track_hover: true}); 
		this.icon = new St.Icon({ icon_name: 'emblem-synchronizing-symbolic', style_class: 'system-status-icon' });
        this.hbox.add_child(this.icon);
        this.add_child(this.hbox);
        
        // connect signal
        this.connect('button-press-event', Lang.bind(this, this._runBackup));
	}
	
	_runBackup() {
		try {
			Util.trySpawnCommandLine("deja-dup --backup");
		} catch(err) {
			Main.notify("Error: unable to run backup");
		}
	}
})

function init() {
}

var _indicator;

function enable() {
    _indicator = new BackupIndicator();
    Main.panel.addToStatusArea('backup-indicator', _indicator);
}

function disable() {
    _indicator.destroy();
}
