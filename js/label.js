function labelResidues (o, labels) {
    var rp = o.structure.getResidueProxy()
    for (var key in labels) {
        if (labels.hasOwnProperty(key)) {
            rp.index = key;
            o.addAnnotation(rp.positionToVector3(), labels[key]);
        }
    }
}
