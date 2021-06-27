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
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.9.4/brython.min.js"></script>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.9.4/brython_stdlib.min.js"></script>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/default.min.css">
                <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
                <style>
                    pre {
                        position: absolute; bottom: 5px; font-size: 13px; width: 94%; padding: 9.5px; line-height: 1.42857143;
                    }
                    code{
                        border: 1px solid #ccc; border-radius: 4px;
                    }
                </style>
            </head>
            <body onload='brython()'>
                <pre id="consolePre">
                    <code id="consoleCode"></code>
                </pre>
                <script type=text/javascript>
                if (typeof console  != "undefined"){
                    if (typeof console.log != 'undefined'){
                        console.olog = console.log;
                    }else{
                        console.olog = function() {};
                    }
                    if (typeof console.log != 'undefined'){
                        console.oerr = console.error;
                    }else{
                        console.oerr = function() {};
                    }
                }
                
                var logger = document.getElementById('consoleCode');
                var preElem = document.getElementById('consolePre');
                console.log = function(message) {
                    console.olog(message);
                    preElem.style.visibility = "visible";
                    preElem.style.bottom = "5px";
                    logger.classList.add("plaintext");
                    hljs.highlightElement(logger);
                    if (typeof message == 'object') {
                        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                    } else {
                        logger.innerHTML += message + '</br>';
                    }
                };
            
                console.error = function(message) {
                    console.oerr(message);
                    preElem.style.visibility = "visible";
                    preElem.style.top = "5px";
                    logger.classList.add("python");
                    hljs.highlightElement(logger);
                    if (typeof message == 'object') {
                        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                    } else {
                        logger.innerHTML += message + '</br>';
                    }
                };
                console.info = console.debug = console.log
                </script>
                <script type='text/python'>${prog}</script>
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
