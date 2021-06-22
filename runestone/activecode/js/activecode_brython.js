import { ActiveCode } from "./activecode.js";

export default class BrythonActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        opts.alignVertical = true;
        this.python3_interpreter = $(orig).data("python3_interpreter");
        this.editor.setValue(this.code);
    }

    async runProg() {
        var prog = await this.buildProg(true);
        let saveCode = "True";
        this.saveCode = await this.manage_scrubber(saveCode);
        $(this.output).text("");
        if (!this.alignVertical) {
            $(this.codeDiv).switchClass("col-md-12", "col-md-6", {
                duration: 500,
                queue: false,
            });
        }
        $(this.outDiv).show({ duration: 700, queue: false });
        prog = `
        <html>
            <head>
                <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/brython@3.9.0/brython.min.js'></script>
                <style>
                    pre {
                        position: absolute; bottom: 5px; background-color: lightgray; font-size: 13px; line-height: 1.42857143; width: 94%; padding: 9.5px;
                        color: #333333; word-break: break-all; word-wrap: break-word; border: 1px solid #ccc; border-radius: 4px; overflow: auto;
                    }
                </style>
            </head>
            <body onload='brython()'>
                <pre id="consolePre" style="visibility:hidden"></pre>
                <script type=text/javascript>
                if (typeof console  != "undefined") 
                    if (typeof console.log != 'undefined')
                        console.olog = console.log;
                    else
                        console.olog = function() {};
            
                console.log = function(message) {
                    document.getElementById('consolePre').style.visibility = "visible";
                    console.olog(message);
                    if (typeof message == 'object') {
                        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                    } else {
                        var logger = document.getElementById('consolePre');
                        logger.innerHTML += message + '</br>';
                    }
                };
                console.error = console.debug = console.info =  console.log
                </script>
                <script type='text/python'>${prog}
                </script>
            </body>
        </html>
        `;
        this.output.srcdoc = prog;
    }

    createOutput() {
        this.alignVertical = true;
        var outDiv = document.createElement("div");
        $(outDiv).addClass("ac_output");
        if (this.alignVertical) {
            $(outDiv).addClass("col-md-12");
        } else {
            $(outDiv).addClass("col-md-5");
        }
        this.outDiv = outDiv;
        this.output = document.createElement("iframe");
        $(this.output).css("background-color", "white");
        $(this.output).css("position", "relative");
        $(this.output).css("height", "400px");
        $(this.output).css("width", "100%");
        outDiv.appendChild(this.output);
        this.outerDiv.appendChild(outDiv);
        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
    }
    enableSaveLoad() {
        $(this.runButton).text($.i18n("msg_activecode_render"));
    }
}