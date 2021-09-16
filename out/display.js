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
        const entitys = [
            { name: "struc", label: "snp" },
            {
                name: "Trp175Tyr",
                label: "snp",
            },
            {
                name: "Kinetic",
                label: "dna",
            },
            {
                name: "structure",
                label: "protein",
            },
            {
                name: "structure",
                label: "protein",
            },
        ];
        return entitys;
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
function render(entitys, text) {
    let template = text;
    let list = "";
    for (let entity of entitys) {
        list += `<li>${entity.name}:${entity.label}</li>`;
        let span = `<span class="label">${entity.label}</span>`;
        let mark = `<mark class="entity ${entity.label}">${entity.name}${span}</mark>`;
        template = template.replace(new RegExp(`(?<!>)${entity.name}(?!<)`, "gmi"), mark);
    }
    const root = document.getElementById("article");
    const mutations = document.getElementById("mutations");
    if (root) {
        root.innerHTML = template;
    }
    if (mutations) {
        mutations.innerHTML = list;
    }
}
function main() {
    let btn = document.getElementById("submit");
    if (btn) {
        btn.addEventListener("click", handler);
    }
}
main();
//# sourceMappingURL=display.js.map