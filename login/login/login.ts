import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    message: string = '';
    isSuccess: boolean = false;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // Read login cookie on page load
        this.http.get<any>('/read-login-cookie', { withCredentials: true }).subscribe({
            next: (data) => {
                if (data.username) {
                    this.username = data.username;
                    this.password = data.password;
                    this.message = 'Login info loaded from cookie!';
                    this.isSuccess = true;
                }
            },
            error: (err) => {
                console.log('No saved cookie found');
            }
        });
    }

    onLogin(): void {
        const body = { username: this.username, password: this.password };
        this.http.post<any>('/login', body, { withCredentials: true }).subscribe({
            next: (data) => {
                this.message = data.message;
                this.isSuccess = data.success;
            },
            error: (err) => {
                this.message = 'Server error';
                this.isSuccess = false;
            }
        });
    }
}
