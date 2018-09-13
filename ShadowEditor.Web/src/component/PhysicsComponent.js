import BaseComponent from './BaseComponent';
import SetValueCommand from '../command/SetValueCommand';

/**
 * 基本信息组件
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function PhysicsComponent(options) {
    BaseComponent.call(this, options);
    this.selected = null;
}

PhysicsComponent.prototype = Object.create(BaseComponent.prototype);
PhysicsComponent.prototype.constructor = PhysicsComponent;

PhysicsComponent.prototype.render = function () {
    var data = {
        xtype: 'div',
        id: 'objectPanel',
        scope: this.id,
        parent: this.parent,
        cls: 'Panel',
        style: {
            borderTop: 0,
            display: 'none'
        },
        children: [{
            xtype: 'row',
            children: [{
                xtype: 'label',
                style: {
                    color: '#555',
                    fontWeight: 'bold'
                },
                text: '物理环境'
            }]
        }]
    };

    var control = UI.create(data);
    control.render();

    this.app.on(`objectSelected.${this.id}`, this.onObjectSelected.bind(this));
    this.app.on(`objectChanged.${this.id}`, this.onObjectChanged.bind(this));
};

PhysicsComponent.prototype.onObjectSelected = function () {
    this.updateUI();
};

PhysicsComponent.prototype.onObjectChanged = function () {
    this.updateUI();
};

PhysicsComponent.prototype.updateUI = function () {
    var container = UI.get('objectPanel', this.id);
    var editor = this.app.editor;
    if (editor.selected && editor.selected instanceof THREE.Scene) {
        container.dom.style.display = '';
    } else {
        container.dom.style.display = 'none';
        return;
    }

    this.selected = editor.selected;
};

export default PhysicsComponent;