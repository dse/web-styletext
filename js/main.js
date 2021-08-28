function StyleText(element) {
    this.element = element;
    if (typeof element === 'string') {
        this.element = document.getElementById(element);
        if (!this.element) {
            console.error('no such element:', element);
            return;
        }
    }

    this.inputs = {};

    this.inputs.fontFamily      = this.element.querySelector('[name="font-family"]');
    this.inputs.fontWeightBold  = this.element.querySelector('[name="font-weight-bold"]');
    this.inputs.fontStyleItalic = this.element.querySelector('[name="font-style-italic"]');
    this.inputs.color           = this.element.querySelector('[name="color"]');
    this.inputs.backgroundColor = this.element.querySelector('[name="background-color"]');
    this.inputs.fontSize        = this.element.querySelector('[name="font-size"]');
    this.inputs.textAlign       = this.element.querySelector('[name="text-align"]');
    this.inputs.textShadowColor = this.element.querySelector('[name="text-shadow-color"]');
    this.inputs.textShadowSize  = this.element.querySelector('[name="text-shadow-size"]');

    this.inputs.textArea        = this.element.querySelector('[name="text-area"]');

    this.loadData();
    this.updateFormFromData();
    this.updateStylesFromData();

    this.inputs.fontFamily.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.fontFamily = event.target.options[event.target.selectedIndex].value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.fontWeightBold.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.fontWeight = event.target.checked ? 'bold' : 'normal';
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.fontStyleItalic.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.fontStyle = event.target.checked ? 'italic' : 'normal';
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.color.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.color = event.target.value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.backgroundColor.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.backgroundColor = event.target.value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.fontSize.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.fontSize = event.target.value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.textAlign.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.textAlign = event.target.options[event.target.selectedIndex].value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.textShadowSize.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.textShadowSize = event.target.value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));
    this.inputs.textShadowColor.addEventListener('change', function (event) {
        event.preventDefault();
        this.data.textShadowColor = event.target.value;
        this.saveData();
        this.updateStylesFromData();
    }.bind(this));

    var updateText = function (event) {
        this.data.textArea = event.target.value;
        this.saveData();
    }.bind(this);
    // just for good measure
    this.inputs.textArea.addEventListener('keypress', updateText);
    this.inputs.textArea.addEventListener('keydown', updateText);
    this.inputs.textArea.addEventListener('keyup', updateText);
    this.inputs.textArea.addEventListener('change', updateText);

    this.element.addEventListener('click', function (event) {
        var presetName = event.target.getAttribute('data-styletext-preset');
        if (presetName == null) { return; }
        var preset = StyleText.presets[presetName];
        if (preset == null) { return; }
        event.preventDefault();
        var key;
        for (key in preset) {
            if (Object.prototype.hasOwnProperty.call(preset, key)) {
                this.data[key] = preset[key];
            }
        }
        this.saveData();
        this.updateFormFromData();
        this.updateStylesFromData();
    }.bind(this));
}
StyleText.presets = {
    loudAsFuck: {
        backgroundColor: "#ff0000",
        color: "#ffff00",
        fontFamily: "Arial",
        fontSize: "64",
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: "#000000",
        textShadowSize: 8
    },
    loudAsFuck2: {
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "Arial Black",
        fontSize: "64",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        textShadowColor: "#333333",
        textShadowSize: 4
    }
};
Object.assign(StyleText.prototype, {
    addEventListeners: function () {
        this.element.addEventListener('change', function (event) {
            this.eventListener(event);
        }.bind(this));
    },
    saveData: function () {
        localStorage.setItem('styletext', JSON.stringify(this.data));
    },
    loadData: function () {
        this.data = JSON.parse(localStorage.getItem('styletext')) || {};
        this.inputs.textArea.value = this.data.textArea;
    },
    updateFormFromData: function () {
        if (this.data.fontFamily != null) {
            this.setSelectValue(this.inputs.fontFamily, this.data.fontFamily);
        }
        if (this.data.fontWeight != null) {
            this.inputs.fontWeightBold.checked = this.data.fontWeight === 'bold';
        }
        if (this.data.fontStyle != null) {
            this.inputs.fontStyleItalic.checked = this.data.fontStyle === 'italic';
        }
        if (this.data.color != null) {
            this.inputs.color.value = this.data.color;
        }
        if (this.data.backgroundColor != null) {
            this.inputs.backgroundColor.value = this.data.backgroundColor;
        }
        if (this.data.fontSize != null) {
            this.inputs.fontSize.value = this.data.fontSize;
        }
        if (this.data.textShadowSize != null) {
            this.inputs.textShadowSize.value = this.data.textShadowSize;
        }
        if (this.data.textShadowColor != null) {
            this.inputs.textShadowColor.value = this.data.textShadowColor;
        }
        if (this.data.textAlign != null) {
            this.setSelectValue(this.inputs.textAlign, this.data.textAlign);
        }
        if (this.data.textArea != null) {
            this.inputs.textArea.value = this.data.textArea;
        }
    },
    updateStylesFromData: function () {
        if (this.data.fontFamily != null) {
            this.inputs.textArea.style.fontFamily      = this.data.fontFamily;
        }
        if (this.data.fontWeight != null) {
            this.inputs.textArea.style.fontWeight      = this.data.fontWeight;
        }
        if (this.data.fontStyle != null) {
            this.inputs.textArea.style.fontStyle       = this.data.fontStyle;
        }
        if (this.data.color != null) {
            this.inputs.textArea.style.color           = this.data.color;
        }
        if (this.data.backgroundColor != null) {
            this.inputs.textArea.style.backgroundColor = this.data.backgroundColor;
        }
        if (this.data.fontSize != null) {
            this.inputs.textArea.style.fontSize        = this.data.fontSize + 'px';
        }
        if (this.data.textShadowSize != null && this.data.textShadowColor != null) {
            this.updateTextShadowFromData();
        }
        if (this.data.textAlign != null) {
            this.inputs.textArea.style.textAlign       = this.data.textAlign;
        }
    },
    updateTextShadowFromData: function () {
        if (!this.data.textShadowSize) {
            this.inputs.textArea.style.textShadow = 'none';
            return;
        }
        var textShadowPixels = this.data.textShadowSize / 64 * this.data.fontSize;
        var textShadowPixelSizes = [];
        var i;
        for (i = 0; i < textShadowPixels; i += 1) {
            textShadowPixelSizes.push(i);
        }
        textShadowPixelSizes.push(textShadowPixels);
        var value = textShadowPixelSizes.map(function (px) {
            return '%spx %spx %s'.replace(/%s/, px).replace(/%s/, px)
                .replace(/%s/, this.data.textShadowColor);
        }.bind(this)).join(', ');
        this.inputs.textArea.style.textShadow = value;
    },
    setSelectValue: function (select, value) {
        var options = Array.from(select.options).map(function (option) {
            return option.value;
        });
        var index = options.indexOf(value);
        var newOption;
        if (index === -1) {
            newOption = document.createElement('option');
            newOption.value = value;
            select.appendChild(newOption);
            select.selectedIndex = options.length;
        } else {
            select.selectedIndex = index;
        }
    },
});
