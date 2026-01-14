export function useProfile() {
    const dummyProfile = {
        name: "user Perera",
        email: "user@email.com",
        phone: "0771234567",
        location: "Colombo, Sri Lanka",
        currentPosition: "Frontend Developer",
        description: "Building modern web apps",
        socialLinks: {
            linkedin: "https://linkedin.com/in/user",
            github: "https://github.com/user",
            twitter: "https://twitter.com/user",
        },
        resume: "https://zipher.lk",
    }

    return {
        profile: dummyProfile,
        resumeUrl: dummyProfile.resume,
        isLoading: false,
        isError: false,
        refetchProfile: () => { },
    }
}
