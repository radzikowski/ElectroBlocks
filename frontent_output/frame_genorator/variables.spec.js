"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelperFunctions = require("../frame/blockly_helper");
const blockly = require("../frame/block");
const variables_1 = require("./variables");
const arduino_frame_1 = require("../arduino/arduino_frame");
const empty_component_1 = require("../arduino/empty_component");
describe('Variables Frame Generators', () => {
    let block;
    let blocklyMock;
    beforeEach(() => {
        blocklyMock = {
            mainWorkspace: {
                getVariableById: () => { }
            }
        };
        block = {
            id: 'block_id',
            getFieldValue(fieldName) {
            }
        };
    });
    it('Set number variable value and name in frame.', () => {
        mockSetVariable('Number', 'variable_name', 0, 32);
        let [frame] = variables_1.variables_set_number_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value).toBe(32);
        expect(frame.variables['variable_name'].type).toBe('Number');
    });
    it('Set string variable value and name in frame.', () => {
        mockSetVariable('String', 'variable_name', '', 'Hello World');
        let [frame] = variables_1.variables_set_string_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value).toBe('Hello World');
        expect(frame.variables['variable_name'].type).toBe('String');
    });
    it('Set boolean variable value and name in frame.', () => {
        mockSetVariable('Boolean', 'variable_name', true, true);
        let [frame] = variables_1.variables_set_boolean_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value).toBe(true);
        expect(frame.variables['variable_name'].type).toBe('Boolean');
    });
    it('Set boolean variable to false.', () => {
        mockSetVariable('Boolean', 'variable_name', true, false);
        let [frame] = variables_1.variables_set_boolean_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value).toBe(false);
        expect(frame.variables['variable_name'].type).toBe('Boolean');
    });
    it('Set color variable value and name in frame.', () => {
        mockSetVariable('Colour', 'variable_name', { red: 0, green: 0, blue: 0 }, { red: 20, green: 0, blue: 30 });
        let [frame] = variables_1.variables_set_colour_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value)
            .toEqual({ red: 20, green: 0, blue: 30 });
        expect(frame.variables['variable_name'].type).toBe('Colour');
    });
    it('get the color variable from the previous frame', () => {
        let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                name: 'variable_name',
                type: 'Colour',
                value: { red: 30, green: 30, blue: 20 }
            }
        }, [], new empty_component_1.EmptyComponent());
        mockGetVariable('Colour', 'variable_name');
        expect(variables_1.variables_get_colour_block(block, previousFrame)).toEqual({ red: 30, green: 30, blue: 20 });
    });
    it('get the number variable from the previous frame', () => {
        let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                name: 'variable_name',
                type: 'Number',
                value: 33
            }
        }, [], new empty_component_1.EmptyComponent());
        mockGetVariable('colour', 'variable_name');
        expect(variables_1.variables_get_number_block(block, previousFrame)).toBe(33);
    });
    it('get the string variable from the previous frame', () => {
        let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                name: 'variable_name',
                type: 'String',
                value: 'Hello World'
            }
        }, [], new empty_component_1.EmptyComponent());
        mockGetVariable('colour', 'variable_name');
        expect(variables_1.variables_get_string_block(block, previousFrame)).toBe('Hello World');
    });
    it('get the boolean variable from the previous frame', () => {
        let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                name: 'variable_name',
                type: 'Boolean',
                value: false
            }
        }, [], new empty_component_1.EmptyComponent());
        mockGetVariable('Boolean', 'variable_name');
        expect(variables_1.variables_get_string_block(block, previousFrame)).toBe(false);
    });
    it('should use the default value if no block is attached', () => {
        mockSetVariable('Colour', 'variable_name', { red: 0, green: 0, blue: 0 }, null);
        let [frame] = variables_1.variables_set_colour_block(block);
        expect(frame.blockId).toBe(block.id);
        expect(frame.variables['variable_name'].name).toBe('variable_name');
        expect(frame.variables['variable_name'].value)
            .toEqual({ red: 0, green: 0, blue: 0 });
        expect(frame.variables['variable_name'].type).toBe('Colour');
    });
    const mockSetVariable = (type, variableName, defaultValue, value) => {
        spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);
        spyOn(block, 'getFieldValue').withArgs('VAR')
            .and.returnValue('variable_id');
        spyOn(blockHelperFunctions, 'getInputValue')
            .withArgs(block, 'VALUE', defaultValue, jasmine.any(arduino_frame_1.ArduinoFrame))
            .and.returnValue(value);
        spyOn(blocklyMock.mainWorkspace, 'getVariableById')
            .withArgs('variable_id')
            .and.returnValue({
            type,
            name: variableName
        });
    };
    const mockGetVariable = (type, variableName) => {
        spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);
        spyOn(block, 'getFieldValue').withArgs('VAR')
            .and.returnValue('variable_id');
        spyOn(blocklyMock.mainWorkspace, 'getVariableById')
            .withArgs('variable_id')
            .and.returnValue({
            type,
            name: variableName
        });
    };
});
//# sourceMappingURL=variables.spec.js.map