import { ThemePalette } from "@angular/material/core";
import { ProgressBarMode } from "@angular/material/progress-bar";

export interface LoadingConfiguration {
    mode: ProgressBarMode,
    color: ThemePalette,
    value: number
}
