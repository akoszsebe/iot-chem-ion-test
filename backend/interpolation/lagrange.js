const VP = module.exports = function(){

};
VP.prototype.interpolate = function(f,fi,x,eps){
    var n = f.length;
    var Q = new Array(n);
    for( i = 0 ; i<n;i++)
    {
        Q[i] = new Array(n)
        for(j = 0 ;j<n;j++)
        {
            Q[i][j] = 0;
        }
    }
    for(i = 0;i<n;i++)
    {
        Q[i][0]= fi[i];
    }
    for(i = 1; i< n;i++)
    {
        for(j = 0;j<i;j++)
        {
            Q[i][j+1]=(Q[j][j]*(f[i]-x)-Q[i][j]*(f[j]-x))/(f[i]-f[j]);
            
        }
        if(Math.abs(Q[i][i]-Q[i-1][i-1])<eps)
        {
            return Q[i][i];
        }
    }

}