import { Profile } from '../../src/models/profiles/interfaces/profile.interface';

const profile: Profile = {
    gender: 'Male',
    governmentID: 'filepath',
    phoneNumber: '9856203541',
    emergencyContact: '2554dsa6232',
    nationality: 'brazilian',
};

const profile_fake: Profile = {
    gender: 'Maled',
    governmentID: 'filepatsh',
    phoneNumber: '9856203541',
    emergencyContact: '2554dsa6232',
    nationality: 'brazilians',
};

export { profile, profile_fake };
