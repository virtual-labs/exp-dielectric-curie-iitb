let dielectric_obs = [];
let temperature_obs = [];
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="act4-exp-title">Dielectric constant vs Temperature Plot</p>`, 3);
    //add left panel text and button
    let left_title = `
    <div style='position: absolute; top: 2.5vw; background-color: rgb(144, 175, 233); font-size: 2vw; padding: 1%; border-radius: 10px;'></div>

	  <canvas id='plot-id'></canvas>

		<div style='text-align: center;'>
		<span style='font-size: 1.6vw;'>Enter the value of Curie temperature from the graph</span> <br>

		<input type='text' id='exp-value' style='display: inline-block; width: 15vw; font-size: 1.4vw;' />
		<button id='l-btn' style='display: inline-block; width: 15vw; font-size: 1.4vw;' class='btn btn-success' onclick='verify_curie_temperature();' >Verify</button> &nbsp;

		<span style='font-size: 1.6vw;' id='th-value'></span>


		
		
		</div>

    </div>

    `;
    pp.addtoleftpannel(left_title);
    // gauss_table();
    plot_data();
}
function verify_curie_temperature() {
    let inp = document.getElementById('exp-value');
    let btn = document.getElementById('l-btn');
    let sp = document.getElementById('th-value');
    if (selected_material_index == 0) {
        btn.style.display = 'none';
        sp.innerHTML = `and the standard value of Curie temperatuer for ${materials[selected_material_index][0]} is 120<sup>o</sup>C`;
    }
    else if (selected_material_index == 1) {
        btn.style.display = 'none';
        sp.innerHTML = `and the standard value of Curie temperature for ${materials[selected_material_index][1]} is 210<sup>o</sup>C`;
    }
    inp.value = inp.value + ` C`;
    inp.disabled = true;
}
function plot_data() {
    //let data = all_data[selected_material_index];
    for (let i = 0; i < obs_data.length; i++) {
        dielectric_obs.push(obs_data[i][4]);
        temperature_obs.push(obs_data[i][1]);
    }
    var ctx = document.getElementById('plot-id');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: temperature_obs,
            datasets: [
                {
                    label: 'Experimental',
                    data: dielectric_obs,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.3,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Dielectric Contant',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Temperature',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Dielectric Constant vs Temperature`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
// activity4();
//# sourceMappingURL=activity4.js.map