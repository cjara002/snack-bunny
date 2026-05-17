"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

const SignedOutToastManager = () => {
  useEffect(() => {
    const flag = sessionStorage.getItem("sb_just_signed_out");
    if (!flag) return;
    sessionStorage.removeItem("sb_just_signed_out");

    Swal.fire({
      toast: true,
      position: "top",
      icon: "success",
      title: "Signed out",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: "snackbunny-toast",
        container: "snackbunny-toast-container",
      },
    });
  }, []);

  return null;
};

export default SignedOutToastManager;
