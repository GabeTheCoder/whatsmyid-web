
const components = route => route.split('/').filter(route => route.length);

const route = (routes, active) => {
    for (const route in routes) {
        const valids = [];
        const params = {};
    
        const match = components(route);
        const path = components(active);
    
        for (const [index, param] of match.entries()) {
            const value = path[index];
            valids.push(value === param || param.startsWith(':'));
    
            const key = param.split(':')[1] || null;
            if (key) params[key] = value;
        }
    
        const valid = match.length === path.length && valids.every(v => v);
        if (valid) return { route, params };
    }
};

export default route;
