// stage is stage
// forward is forward pdb file,
// reverse is reverse pdb file,
// ts is frame # for transition state (change between f/r)
function animate(stage, forward, reverse, ts) {
    stage.loadFile(forward, {asTrajectory: true}).then (function (o_f) {
    stage.loadFile(reverse, {asTrajectory: true}).then (function (o_r) {
        var traj_f = o_f.addTrajectory().trajectory;
        var traj_r = o_r.addTrajectory().trajectory;
        var player_f = new NGL.TrajectoryPlayer(traj_f, {
            step: 1,
            timeout: 1,
            interpolateStep: 1,
            start: 0,
            end: ts,
            interpolateType: 'linear',
            mode: 'once',
            direction: 'forward'
        });
        var player_r = new NGL.TrajectoryPlayer(traj_r, {
            step: 1,
            timeout: 1,
            interpolateStep: 1,
            start: 0,
            end: traj_r.frameCount - ts,
            interpolateType: 'linear',
            mode: 'once',
            direction: 'backward'
        });

        var repr;

        player_f.signals.haltedRunning.add(function (e) {
            o_f.removeRepresentation(repr);
            repr = o_r.addRepresentation('licorice');
            player_r.play();
        });
        player_r.signals.haltedRunning.add(function (e) {
            o_r.removeRepresentation(repr);
            repr = o_f.addRepresentation('licorice');
            player_f.play();
        });

        repr = o_f.addRepresentation('licorice');
        o_f.autoView();
        player_f.play();
    });
    });
}
