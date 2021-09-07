"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function api(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = "http://10.16.24.230:8000/find";
        let data = {
            title: "",
            abstract: "",
            content: text,
        };
        let header = new Headers({
            "Content-Type": "application/json",
        });
        const payload = JSON.stringify(data);
        const resp = yield fetch(server, {
            method: "POST",
            body: payload,
            headers: header,
            mode: "cors",
        });
        const entities = yield resp.json();
        console.log(entities);
        if (resp) {
            if (resp.body) {
                console.log(resp.body);
            }
        }
        console.log(entities);
        return entities;
    });
}
function handler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const text = document.getElementById("input").value;
        const entitys = yield api(text);
        render(entitys, text);
        console.log(entitys);
    });
}
function main() {
    let btn = document.getElementById("submit");
    if (btn) {
        btn.addEventListener("click", handler);
    }
}
function render(entitys, text) {
    let template = text;
    for (let entity of entitys) {
        let span = `<span class="label">${entity.label}</span>`;
        let mark = `<mark class="entity ${entity.label}">${entity.name}${span}</mark>`;
        template = template.replace(new RegExp(entity.name, "gmi"), mark);
    }
    const root = document.getElementById("result");
    if (root) {
        root.innerHTML = template;
    }
}
main();
//# sourceMappingURL=display.js.map