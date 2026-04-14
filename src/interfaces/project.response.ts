export interface ProjectResponseItem {
    id:           string;
    title:        string;
    description:  string;
    technologies: string[];
    imageUrl:     string;
    demoUrl:      string;
    repoUrl:      string;
    featured:     boolean;
    createdAt:    Date | string;
    updatedAt:    Date | string;
}
