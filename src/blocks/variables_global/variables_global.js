
'use strict';
/* global Blockly,  RoboBlocks */
/* jshint sub:true */

  /**
  * variable code generation
  * @return {String} Code generated with block parameters
  */
function isNumber(obj) { return !isNaN(parseFloat(obj)); }

Blockly.Arduino.variable = function() {
  // Variable setter.
    var varType;
    var varValue=Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
    if(isNumber(varValue)){
        varType='int';
    }
    else{
        varType='String';
    }
    var varName = this.getFieldValue('VAR')||'';

    // Blockly.Arduino.definitions_['declare_var'+varName] = JST['variable']({
    //     'varType': varType,
    //     'varName': varName
    // });
    Blockly.Arduino.definitions_['declare_var'+varName]=varType+' '+varName;
    Blockly.Arduino.setups_['define_var'+varName]=varName+'='+varValue;
    
    return '';
};


Blockly.Blocks.variable = {
  // Variable setter.
    category: RoboBlocks.LANG_CATEGORY_VARIABLES,  // Variables are handled specially.
    helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/variable',
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
        this.appendDummyInput()
            .appendField(RoboBlocks.LANG_VARIABLE)
            .appendField(new Blockly.FieldTextInput(''), 'VAR');

        this.appendValueInput('VALUE')
            .appendField(RoboBlocks.LANG_VARIABLE_EQUALS);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(RoboBlocks.LANG_VARIABLE_TOOLTIP);
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
};