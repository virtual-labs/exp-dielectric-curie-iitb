let act3_scene1;
let act3_canvas2;
let act3_context2;
let current_temp = 0;
let current_cap = 0;
let current_index = -1;
let n_obs = 0;
let act3_inner_canvas = `
<canvas id='canvas-new' style='position: absolute;'></canvas>
`;
let act3_probe;
let act3_left_pin;
let act3_right_pin;
let act3_pill_img;
//let act3_needle: Chemistry.act3_needle;
// em neddle angle
let act3_needle_angle = 150;
function activity3() {
    //clear screen
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    obs_data = [];
    pp.addoffcanvas(4);
    let can4 = document.getElementById('offcanvasRight4');
    let offcanele = document.getElementsByClassName('offcanvasbtn')[1];
    offcanele.innerHTML = `<i class="bi bi-table" style="font-size: calc(1vw + 12px);">`;
    offcanele.style.top = '7vw';
    can4.style.width = '75vw';
    pp.showtitle(`<p id="act3-exp-title">Obervation</p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">You need to take observations at t = 25, 78, 134, 172, 200 for Barium titatnate and for lead zirconate t = 29, 106, 168, 208, 273</p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 2%; font-weight: 500; font-size: calc(1vw + 12px);">Observation Table</p> <br> <div id='obs-table' ></div>`, 4);
    //add left panel text and button
    let left_title = `
    <div style='position: absolute; top: 2.5vw; background-color: rgb(144, 175, 233); font-size: 2vw; padding: 1%; border-radius: 10px;'>Vary the temperartue and add reading</div>

    <div id='start-first' style='position: absolute; top: 10vw; left: 5vw; z-index: 10;'>
   	 	<button class='btn btn-success' style='font-size: 1.5vw;  width: 20vw;' onclick='power_on();' >Next</button>
    </div>

	<div id='display-box' style='display: none' >
		<div>
			<input id='c-dsp' type='text' style='position: absolute; width: 7vw; background: transparent; border: none; font-weight: 700; top: 13.7vw; left: 63vw; z-index: 5; text-align: center; font-size: 1.2vw; color: white;' disabled value='00 pf' />
		</div>

		<div>
			<input id='t-dsp' type='text' style='position: absolute; width: 7vw; background: transparent; border: none; font-weight: 700; top: 13.7vw; left: 79.5vw; z-index: 5; text-align: center; font-size: 1.2vw; color: white;' disabled value='00 C' />
		</div>

		<div id='control-1' style='display: none'>
			<button id='inc-btn' style='position: absolute; width: 10vw; top: 11.9vw; left: 10vw; z-index: 5; text-align: center; font-size: 1.2vw;' class='btn btn-dark' onclick='inc_temp();' >Temperature <i class="bi bi-arrow-up"></i></button>

			<button id='dec-btn' style='position: absolute; width: 10vw; top: 11.9vw; left: 25vw; z-index: 5; text-align: center; font-size: 1.2vw;' class='btn btn-dark' onclick='dec_temp();' >Temperature <i class="bi bi-arrow-down"></i></button>

			<button id='add-btn' style='position: absolute; width: 15vw; top: 20vw; left: 15vw; z-index: 5; text-align: center; font-size: 1.2vw;' class='btn btn-success' onclick='add_obs_reading();' >Add Reading</button>

			<br>

			<div style='position: absolute; width: 15vw; top: 25vw; left: 10vw; z-index: 5;'>
				<p><span style='font-size: 1.4vw;'>$$ C_0 = \\frac{\\epsilon_0 A}{t} \\ in \\ pF $$</span></p>
				<p><span style='font-size: 1.4vw;'>$$ \\epsilon = \\frac{C}{C_0} $$</span></p>
				<p><span style='font-size: 1.4vw;'>$$ A = ${materials[selected_material_index][3]} cm^2 \\ and \\ \\epsilon_0 = 8.85 \\times 10^{-3} pF/mm $$</span></p>
			</div>
			
		</div>
	</div>

    </div>

    `;
    pp.addtoleftpannel(left_title);
    // gauss_table();
    show_rp();
    //add all canvases and contexts
    pp.addtoleftpannel(act3_inner_canvas);
    canvas = document.getElementById('canvas-new');
    context = canvas.getContext('2d');
    // act3_canvas2 = <HTMLCanvasElement>document.getElementById('canvas-2');
    // act3_context2 = act3_canvas2.getContext('2d');
    act3_scene1 = new Scene_Canvas(canvas);
    //act3_scene1.addcanvas(act3_canvas2);
    act3_probe = new Chemistry.Custome_image(assembly, new Chemistry.Point(1350, 460), 804 * 1.3, 450 * 1.3, canvas);
    act3_scene1.add(act3_probe);
    // load_buttons();
    window.onload = a3_windowresize;
    window.onresize = a3_windowresize;
    a3_windowresize();
    load_obs_table();
}
function a3_windowresize() {
    //canvas size
    a3_canvas_size();
    //canvas mapping
    a3_canvas_mapping();
    //draw scene
    act3_scene1.draw();
}
function a3_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
    // act3_canvas2.width = window.innerWidth * 0.21;
    // act3_canvas2.height = window.innerWidth * 0.15;
}
function a3_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
    // act3_context2.translate(0, act3_canvas2.height);
    // act3_context2.scale(1, -1);
}
// current activity functions
function power_on() {
    let first_box = document.getElementById('start-first');
    let dsp_box = document.getElementById('display-box');
    let cntr = document.getElementById('control-1');
    first_box.style.display = 'none';
    dsp_box.style.display = 'block';
    cntr.style.display = 'block';
    setTimeout(() => { MathJax.typeset(); }, 100);
}
function inc_temp() {
    if (selected_material_index == 0 && current_index < 174) {
        current_index++;
        let inp1 = document.getElementById('c-dsp');
        let inp2 = document.getElementById('t-dsp');
        current_cap = all_data[selected_material_index][current_index][2];
        current_temp = all_data[selected_material_index][current_index][1];
        inp1.value = current_cap.toFixed(0) + ` pf`;
        inp2.value = current_temp.toFixed(0) + ` C`;
    }
    else if (selected_material_index == 1 && current_index < 250) {
        let inp1 = document.getElementById('c-dsp');
        let inp2 = document.getElementById('t-dsp');
        current_index++;
        current_cap = all_data[selected_material_index][current_index][2];
        current_temp = all_data[selected_material_index][current_index][1];
        inp1.value = current_cap.toFixed(0) + ` pf`;
        inp2.value = current_temp.toFixed(0) + ` C`;
    }
    else {
        alert('You can not go higher');
    }
}
function dec_temp() {
    if (current_index >= 0) {
        current_index--;
        let inp1 = document.getElementById('c-dsp');
        let inp2 = document.getElementById('t-dsp');
        current_cap = all_data[selected_material_index][current_index][2];
        current_temp = all_data[selected_material_index][current_index][1];
        inp1.value = current_cap.toFixed(0) + ` pf`;
        inp2.value = current_temp.toFixed(0) + ` C`;
    }
    else {
        alert('You can not go lower');
    }
}
function add_obs_reading() {
    if (current_cap == 0) {
        alert('Try changing the temperature');
        return;
    }
    else {
        let a = materials[selected_material_index][3];
        let thickness = materials[selected_material_index][1];
        let c0 = (epsilon_0 * parseFloat(a.toString())) / (parseFloat(thickness.toString()));
        let dielectric_constant = current_cap / c0;
        let arr = [n_obs + 1, current_temp, current_cap, c0, dielectric_constant];
        obs_data.push(arr);
        let header = ['Sno.', `Temperature (<sup>o</sup>C)`, 'Capacitance, C (pF)', 'Capacitance, Co (pF)', `Dielectric Constant`];
        let parent = document.getElementById('obs-table');
        parent.innerHTML = ``;
        tab_obs = new Verify_Rows_Cols_Custom_Fixed_Update1(header, obs_data, [n_obs], [[3, 4]], '', parent, true, true, () => { }, 3);
        tab_obs.load_table();
        show_rp4();
        n_obs++;
        if (n_obs == 5) {
            activity4();
        }
    }
}
function load_obs_table() {
    let header = ['Sno.', `Temperature (<sup>o</sup>C)`, 'Capacitance, C (pF)', 'Capacitance, Co (pF)', `Dielectric Constant`];
    obs_data = [];
    let parent = document.getElementById('obs-table');
    tab_obs = new Verify_Rows_Cols_Custom_Fixed_Update1(header, obs_data, [0], [[3, 4]], '', parent, true, true, () => { }, 3);
    tab_obs.load_table();
}
function show_rp4() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
}
// activity3();
//# sourceMappingURL=activity3.js.map