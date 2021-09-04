"use strict";
var text = "9790663	Kinetic analysis and X-ray structure of haloalkane dehalogenase with a modified halide-binding site.	Haloalkane dehalogenase (DhlA) catalyzes the hydrolysis of haloalkanes via an alkyl-enzyme intermediate. Trp175 forms a halogen/halide-binding site in the active-site cavity together with Trp125. To get more insight in the role of Trp175 in DhlA, we mutated residue 175 and explored the kinetics and X-ray structure of the Trp175Tyr enzyme. The mutagenesis study indicated that an aromatic residue at position 175 is important for the catalytic performance of DhlA. Pre-steady-state kinetic analysis of Trp175Tyr-DhlA showed that the observed 6-fold increase of the Km for 1,2-dibromoethane (DBE) results from reduced rates of both DBE binding and cleavage of the carbon-bromine bond. Furthermore, the enzyme isomerization preceding bromide release became 4-fold faster in the mutant enzyme. As a result, the rate of hydrolysis of the alkyl-enzyme intermediate became the main determinant of the kcat for DBE, which was 2-fold higher than the wild-type kcat. The X-ray structure of the mutant enzyme at pH 6 showed that the backbone structure of the enzyme remains intact and that the tyrosine side chain lies in the same plane as Trp175 in the wild-type enzyme. The Clalpha-stabilizing aromatic rings of Tyr175 and Trp125 are 0.7 A further apart and due to the smaller size of the mutated residue, the volume of the cavity has increased by one-fifth. X-ray structures of mutant and wild-type enzyme at pH 5 demonstrated that the Tyr175 side chain rotated away upon binding of an acetic acid molecule, leaving one of its oxygen atoms hydrogen bonded to the indole nitrogen of Trp125 only. These structural changes indicate a weakened interaction between residue 175 and the halogen atom or halide ion in the active site and help to explain the kinetic changes induced by the Trp175Tyr mutation.";
var names = ["Trp175Tyr"];
// function position(text: string, names: Array<string>): Array<Entity> {
//   // let expression = /name/
//   let entitys: Array<Entity> = [];
//   for (let name of names) {
//     // const expr = /name/gmi
//     let regex = new RegExp(name, "gim");
//     let match = regex.exec(text);
//     while (match) {
//       let res = {
//         name: name,
//         start: match.index,
//         end: match.index + name.length,
//       };
//       entitys.push(res);
//       console.log(match.index);
//       match = regex.exec(text);
//     }
//   }
//   return entitys;
// }
function render(entitys, text) {
    var template = text;
    for (var _i = 0, entitys_1 = entitys; _i < entitys_1.length; _i++) {
        var entity = entitys_1[_i];
        var span = "<span class>" + entity.label + "</span>";
        var mark = "<mark class=\"entity " + entity.label + "\">" + entity.name + "</mark>";
        var fmt = mark + span;
        template = template.replace(new RegExp(entity.name, "gmi"), fmt);
        // template.replaceAll(entity.name, fmt)
    }
    var root = document.getElementById("result");
    if (root) {
        root.innerHTML = template;
    }
    console.log(template);
}
// const entitys = position(text, names);
// const entitys: RawData =
var entitys = [
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
];
render(entitys, text);
//# sourceMappingURL=display.js.map