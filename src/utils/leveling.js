import AsyncStorage from '@react-native-async-storage/async-storage';



function xpForNextLevel(level) {
    return Math.floor(50 + Math.pow(level, 2) * 5);
}

export async function completeTask(user, task) {
    const gainedXP = task.difficulty * 10;
    user.globalXP += gainedXP;

    const statGains = {};
    const statLeveled = {};

    for (const stat in task.statMap || {}) {
        const gain = task.statMap[stat] * gainedXP;
        user.stats[stat].xp += gain;
        user.stats[stat].lastGainedXP = gain;
        statGains[stat] = gain;

        const requiredXP = xpForNextLevel(user.stats[stat].level);
        if (user.stats[stat].xp >= requiredXP) {
            user.stats[stat].level += 1;
            user.stats[stat].xp -= requiredXP; // carry over extra XP
            statLeveled[stat] = true;
        }
    }


    // Global level
    const globalRequiredXP = xpForNextLevel(user.globalLevel);
    let globalLeveled = false;
    if (user.globalXP >= globalRequiredXP) {
        user.globalLevel += 1;
        user.globalXP -= globalRequiredXP;
        globalLeveled = true;
    }

    //  Persist global level and XP
    try {
        await AsyncStorage.setItem('@global_level', user.globalLevel.toString());
        await AsyncStorage.setItem('@global_xp', user.globalXP.toString());
        await AsyncStorage.setItem('@stats', JSON.stringify(user.stats));

        await AsyncStorage.setItem('@quest_progress', JSON.stringify(user.questProgress));

    } catch (e) {
        console.log('Error saving global data:', e);
    }


    return { user, gainedXP, statGains, statLeveled, globalLeveled };
}
