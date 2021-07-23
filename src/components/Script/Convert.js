const outter_circle = ['C_maj', 'G_maj', 'D_maj', 'A_maj', 'E_maj', 'B_maj', 'F_sharp_maj', 'C_sharp_maj', 'G_sharp_maj', 'D_sharp_maj', 'A_sharp_maj', 'F_maj']
const inner_circle = ['A_min', 'E_min', 'B_min', 'F_sharp_min', 'C_sharp_min', 'G_sharp_min', 'E_flat_min', 'B_flat_min', 'F_min', 'C_min', 'G_min', 'D_min'] 
const key_to_number = ['A', 'A_sharp', 'B', 'C', 'C_sharp', 'D', 'D_sharp', 'E', 'F', 'F_sharp', 'G', 'G_sharp']
const quality = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
const sharpToFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']



// A_sharp_maj_7 -> A#maj7
// A_maj_7 -> Amaj7
// Takes a chord returned by Dillon's code, and turns it into something more presentable
export const dillonToDisplay = (chord) => {

	let res = chord;

	if (res.includes("_sharp"))
		res.replace("_sharp", "#")

	if (res.includes("_maj"))
		res.replace("_maj", "")

	if (res.includes("_min"))
		res.replace("_min", "m")

	if (res.includes("_dim"))
		res.replace("_dim", "dim")

	if (res.includes("_7"))
		res.replace("_7", "7")
	return res	
}

// A#maj7 -> A_sharp_maj_7
// A#maj7 -> A_maj_7
// export const displayToDillon = (chord) => {
// 	let res = chord;
// 	if (res.includes("#"))
// 		res.replace("#", "_sharp")
	
// 	return res

// }

// Takes a note returned by Dillon's code, and turns it into something Tone.js accepts
export const dillonNoteToTone = (note) => {

	// console.log("Inside dillonNoteToTone")
	// console.log(note)
	let res = note
	if (note.includes("_sharp"))
	{
		res = res.replace("_sharp", "#")
		// console.log("In if check")
	}
	if (note.includes("_maj"))
	{
		res = res.replace("_maj", "")
		// console.log("In if check")
	}

	return res
}